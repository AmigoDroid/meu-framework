import DashboardTopBar from "./DashboardTopBar";
import DashboardSummary from "./DashboardSummary";
import DashboardNetworkPanel from "./DashboardNetworkPanel";
import DashboardRightPanel from "./DashboardRightPanel";
import DashboardFooterCards from "./DashboardFooterCards";
import "./DashboardApp.css";

export default function DashboardApp() {
  return (
    <div className="dashboard-page">
      <DashboardTopBar />
      <DashboardSummary />
      <DashboardNetworkPanel />
      <DashboardRightPanel />
      <DashboardFooterCards />
    </div>
  );
}
