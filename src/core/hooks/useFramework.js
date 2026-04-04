import { useContext } from "react";
import { FrameworkContext } from "../FrameworkProvider";

export function useFramework() {
  return useContext(FrameworkContext);
}