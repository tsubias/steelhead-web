import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FLOORS, TASKS } from "./riserConfig";
import { RiserCtx } from "./riserContext";
import RunnerBot from "./RunnerBot";
import LogoCarrier from "./LogoCarrier";
import "./riser.css";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * PowerRiser
 * Wraps all floors. Draws the structural riser (service drop at the roof, steel conduit down the left
 * gutter) and runs the Runner: one small robot that follows the visitor down the page, and services
 * each floor in order once that floor scrolls into view. Work stays done when scrolling back up.
 */
export default function PowerRiser({ children }) {
  const reduced = useMemo(prefersReducedMotion, []);
  const [power, setPower] = useState(() =>
    reduced ? Object.fromEntries(FLOORS.map((f) => [f.id, "lit"])) : {}
  );
  const [pose, setPose] = useState(reduced ? "done" : "idle");

  const rootRef = useRef(null);
  const pipeRef = useRef(null);
  const litRef = useRef(null);
  const runnerRef = useRef(null);
  const boxes = useRef({});

  const register = useCallback((id, el) => {
    if (el) boxes.current[id] = el;
    else delete boxes.current[id];
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const N = FLOORS.length;
    const born = performance.now();
    const m = {
      y: null,
      front: null,
      frontOn: reduced,
      idx: reduced ? N : 0,
      mode: "idle", // idle | work
      t: 0,
      faulted: false,
      lit: false,
      pose: reduced ? "done" : "idle",
      lastMove: 0,
      last: born,
      pipeH: "",
    };
    let raf = 0;

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - m.last) / 1000);
      m.last = now;

      const pipe = pipeRef.current;
      const runner = runnerRef.current;
      const litEl = litRef.current;
      if (!pipe || !runner || !litEl) return;

      const rr = root.getBoundingClientRect();
      const ys = new Array(N);
      for (let i = 0; i < N; i += 1) {
        const el = boxes.current[FLOORS[i].id];
        if (!el) return;
        const r = el.getBoundingClientRect();
        ys[i] = r.top - rr.top + r.height / 2;
      }

      const pipeTop = pipe.offsetTop;
      const riserX = pipe.offsetLeft; // pipe is centered on this x via translateX(-50%)
      const bottomY = ys[N - 1];
      const h = `${Math.max(0, bottomY - pipeTop + 14)}px`;
      if (h !== m.pipeH) {
        pipe.style.height = h;
        m.pipeH = h;
      }

      const vh = window.innerHeight;
      const viewTop = -rr.top;
      if (m.y == null) m.y = reduced ? bottomY : ys[0];
      if (m.front == null) m.front = pipeTop;

      const nextY = m.idx < N ? ys[m.idx] : null;
      const armed = now - born > 800;
      const isLast = m.idx === N - 1;
      const trigger =
        armed &&
        nextY != null &&
        (isLast ? nextY <= viewTop + vh - 24 : nextY <= viewTop + vh * 0.62);
      let moving = false;

      if (reduced) {
        m.y = bottomY;
        m.front = bottomY;
      } else if (m.mode === "work") {
        const floor = FLOORS[m.idx];
        const task = TASKS[floor.task];
        const offscreenAbove = ys[m.idx] < viewTop - 60;
        m.t += dt * (offscreenAbove ? 14 : 1);

        if (task.faultAt != null && !m.faulted && m.t >= task.faultAt) {
          m.faulted = true;
          setPower((p) => ({ ...p, [floor.id]: "fault" }));
        }
        if (!m.lit && m.t >= task.litAt) {
          m.lit = true;
          if (m.idx === 0) m.frontOn = true;
          setPower((p) => ({ ...p, [floor.id]: "lit" }));
        }
        if (m.t >= task.total) {
          m.idx += 1;
          m.mode = "idle";
        }
      } else {
        let target;
        let speed;
        if (m.idx >= N) {
          target = bottomY;
          speed = 600;
        } else if (trigger) {
          target = nextY;
          speed = Math.abs(nextY - m.y) > 700 ? 2800 : 850;
        } else {
          // Hover alongside the visitor, but never past the next unserviced floor.
          const lo = ys[0];
          const hi = Math.max(lo, nextY - 48);
          target = clamp(viewTop + vh * 0.5, lo, hi);
          speed = Math.abs(target - m.y) > 600 ? 900 : 240;
        }
        const d = target - m.y;
        const v = Math.min(speed, Math.abs(d) * 6 + 25);
        const step = Math.sign(d) * Math.min(Math.abs(d), v * dt);
        m.y += step;
        if (Math.abs(step) > 0.15) {
          m.lastMove = now;
          moving = true;
        }
        if (trigger && m.idx < N && Math.abs(nextY - m.y) < 1.5) {
          m.y = nextY;
          m.mode = "work";
          m.t = 0;
          m.faulted = false;
          m.lit = false;
        }
      }

      // Power front trails the Runner down the riser and never retreats.
      if (!reduced && m.frontOn) {
        const want = Math.max(m.front, m.y);
        m.front += Math.min(want - m.front, 900 * dt);
      }
      litEl.style.height = `${Math.max(0, m.front - pipeTop)}px`;

      runner.style.transform = `translate3d(${riserX}px, ${m.y}px, 0)`;
      runner.style.visibility = "visible";

      let nextPose;
      if (m.mode === "work") nextPose = TASKS[FLOORS[m.idx].task].pose;
      else if (moving || now - m.lastMove < 220) nextPose = "climb";
      else if (m.idx >= N) nextPose = "done";
      else nextPose = "idle";
      if (nextPose !== m.pose) {
        m.pose = nextPose;
        setPose(nextPose);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const ctx = useMemo(() => ({ register, power, reduced }), [register, power, reduced]);
  const dropLive = power[FLOORS[0].id] === "lit";

  return (
    <RiserCtx.Provider value={ctx}>
      <div ref={rootRef} className="riser-root">
        {/* Service drop: utility line, weatherhead and meter at the roof */}
        <div className={`riser-drop ${dropLive ? "drop-live" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
            <path d="M-90 2 Q-40 24 13 14" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="-90" cy="2" r="2" fill="#475569" />
            {/* Weatherhead (gooseneck) on a short mast */}
            <rect x="14" y="16" width="12" height="22" rx="2" fill="#B8C0CA" stroke="#566070" strokeWidth="1.2" />
            <path d="M20 16 L20 9 Q20 4 26 5" stroke="#8C95A1" strokeWidth="5" strokeLinecap="round" />
            <circle cx="13" cy="13.5" r="2" fill="#F76115" stroke="#101828" strokeWidth="0.8" />
            {/* Meter */}
            <rect x="5" y="38" width="30" height="30" rx="5" fill="#E5E7EB" stroke="#101828" strokeWidth="1.6" />
            <circle cx="20" cy="51" r="10" fill="#F8FAFC" stroke="#566070" strokeWidth="1.2" />
            <line className="meter-hand" x1="20" y1="51" x2="20" y2="43.5" stroke="#101828" strokeWidth="1.6" strokeLinecap="round" />
            <circle className="meter-lamp" cx="20" cy="63.5" r="2.1" />
            {/* Nipple down to the riser */}
            <rect x="10" y="68" width="20" height="32" fill="#B8C0CA" stroke="#566070" strokeWidth="1.2" />
          </svg>
        </div>

        {/* The riser: structural steel conduit with a sight-window core */}
        <div ref={pipeRef} className="riser-pipe" aria-hidden="true">
          <div className="riser-core" />
          <div ref={litRef} className="riser-lit" />
        </div>

        {children}

        {/* The Steelhead Logo Carrier (Precision Telemetry Runner) */}
        <div ref={runnerRef} className="runner-root" aria-hidden="true">
          <div className="runner-box">
            <LogoCarrier pose={pose} />
          </div>
        </div>
      </div>
    </RiserCtx.Provider>
  );
}
