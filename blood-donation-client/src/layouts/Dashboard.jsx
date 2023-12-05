import { Outlet } from "react-router-dom";
import DashboardNavbar from "../Components/DashboardNavbar";

const Dashboard = () => {
  return (
    <div className="font-josefin-sans bg-white">
      {/* Navbar */}
      <DashboardNavbar />
      {/* Outlet */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
