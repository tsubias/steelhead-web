/**
 * Riser config: the page is a building, each section is a floor.
 * Order here = order on the page (top to bottom). The Runner services floors in this order.
 *
 * offset   : desktop-only horizontal stagger step (0-4). Mobile ignores it.
 * junction : optional CSS length for where the branch meets the section (default 40px).
 * task     : key into TASKS below.
 */
export const FLOORS = [
  { id: "ticket", label: "ROOF", short: "RF", task: "breaker", offset: 0, junction: "calc(var(--drop-h) + 24px)" },
  { id: "warning", label: "FL 07", short: "07", task: "repair", offset: 2 },
  { id: "backstop", label: "FL 06", short: "06", task: "connect", offset: 4 },
  { id: "zero", label: "FL 05", short: "05", task: "connect", offset: 1 },
  { id: "carrier", label: "FL 04", short: "04", task: "connect", offset: 3 },
  { id: "locker", label: "FL 03", short: "03", task: "connect", offset: 0 },
  { id: "who", label: "FL 02", short: "02", task: "connect", offset: 2 },
  { id: "next", label: "FL 01", short: "01", task: "connect", offset: 1 },
  { id: "ground", label: "GND", short: "G", task: "finale", offset: 0, junction: "128px" },
];

export const FLOOR_BY_ID = Object.fromEntries(FLOORS.map((f) => [f.id, f]));

/**
 * Task timelines (seconds). faultAt: floor starts shorting. litAt: floor switches on.
 * total: Runner leaves. Phase 2 will add distinct tasks for the middle floors.
 */
export const TASKS = {
  breaker: { pose: "breaker", faultAt: null, litAt: 1.1, total: 1.6 },
  repair: { pose: "repair", faultAt: 0.45, litAt: 4.0, total: 4.6 },
  connect: { pose: "connect", faultAt: null, litAt: 0.8, total: 1.2 },
  finale: { pose: "connect", faultAt: null, litAt: 1.2, total: 1.8 },
};
