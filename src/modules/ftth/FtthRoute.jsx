import FtthPage from "./FtthPage";
import { FtthNetworkProvider } from "./context/FtthNetworkProvider";

export default function FtthRoute() {
  return (
    <FtthNetworkProvider>
      <FtthPage />
    </FtthNetworkProvider>
  );
}
