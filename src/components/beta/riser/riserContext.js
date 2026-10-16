import { createContext, useContext } from "react";

export const RiserCtx = createContext(null);
export const FloorCtx = createContext("dead");

export const useRiser = () => useContext(RiserCtx);

/** 'dead' | 'fault' | 'lit' for the floor this component is rendered inside. */
export const useFloorPower = () => useContext(FloorCtx);
