import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";

const Root = () => {
  return (
    <div className="font-josefin-sans bg-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
