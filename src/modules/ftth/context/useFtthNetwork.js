import { useContext } from "react";
import { FtthNetworkContext } from "./FtthNetworkContext";

export function useFtthNetwork() {
  const context = useContext(FtthNetworkContext);

  if (!context) {
    throw new Error("useFtthNetwork deve ser usado dentro de FtthNetworkProvider");
  }

  return context;
}
