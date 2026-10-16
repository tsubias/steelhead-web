import React, { useCallback } from "react";
import { FLOOR_BY_ID } from "./riserConfig";
import { FloorCtx, useRiser } from "./riserContext";

/**
 * Floor: wraps one section. Draws the junction box on the riser and the branch conduit feeding the
 * section. Power state ('dead' | 'fault' | 'lit') is exposed as data-power, which riser.css uses to
 * switch chrome (lamp, branch, bus bar, glow). Text colors are never changed by power state.
 */
export default function Floor({ id, children }) {
  const { register, power } = useRiser();
  const cfg = FLOOR_BY_ID[id];
  const status = power[id] || "dead";
  const setBox = useCallback((el) => register(id, el), [id, register]);

  return (
    <div
      className={`floor floor-o${cfg.offset}`}
      data-power={status}
      data-floor={id}
      style={cfg.junction ? { "--jy": cfg.junction } : undefined}
    >
      <div className="floor-branch" aria-hidden="true">
        <div className="floor-branch-core" />
      </div>

      <div className="floor-jbox" ref={setBox} aria-hidden="true">
        <span className="jb-lamp" />
        <span className="jb-label">
          <span className="lg:hidden">{cfg.short}</span>
          <span className="hidden lg:inline">{cfg.label}</span>
        </span>
        <span className="jb-lever" />
        <span className="jb-sparks">
          <i /><i /><i /><i /><i /><i />
        </span>
      </div>

      <FloorCtx.Provider value={status}>
        <div className="floor-body">{children}</div>
      </FloorCtx.Provider>
    </div>
  );
}
