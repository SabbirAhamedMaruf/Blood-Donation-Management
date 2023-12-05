import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { SecurityContext } from "../../Provider/SecurityProvider";
import useUserType from "../../API/useUserType";
import "../../index.css";
import useUserData from "../../API/useUserData";



const Navbar = () => {
  const [userType] = useUserType();
  const [, userData] = useUserData();
  console.log(userData);

  // getting user data
  const { user, handleSignOut } = useContext(SecurityContext);
  return (
    <div className="px-2 md:px-10 lg:py-2 font-bold  w-full ">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <div
              tabIndex={0}
              className="text-center absolute left-0 dropdown-content mt-3 z-30 p-2 shadow-xl rounded-box w-[250px] md:w-[300px] space-y-3 bg-white"
            >
              {user ? (
                <>
                  <div className="flex  justify-around items-center gap-2 bg-red-500 p-3 rounded-xl text-xl text-white">
                    <h1 className="text-[13px] md:text-[18px]">
                      {userData.name}
                    </h1>
                    <img
                      src={userData.photo}
                      className="w-10 md:w-14 rounded-full"
                    />
                  </div>
                  <ul className="navmenu text-[13px] md:text-[18px] flex flex-col text-center">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/blogs">Blog</NavLink>
                    <NavLink to="/contact">Donation Request</NavLink>
                    <NavLink to="/search-donors">Search Donors</NavLink>
                    <NavLink to="/dashboard/userprofile">Dashboard</NavLink>
                    <NavLink to="/contact">Fundings</NavLink>
                  </ul>
                  <button
                    className="text-[13px] md:text-[18px] px-3 py-2 bg-red-500 text-white rounded-full"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <ul className="navmenu flex flex-col text-left z-10 text-[13px] md:text-[18px]">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/menu">Blog</NavLink>
                  <NavLink to="/contact">Donation Request</NavLink>
                  <NavLink to="/search-donors">Search Donors</NavLink>
                </ul>
              )}
            </div>
          </div>

          {/* Desktop menu */}
          <ul className="navmenu hidden lg:flex nav menu menu-horizontal text-[18px] space-x-5">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blogs">Blog</NavLink>
            <NavLink to="/donation-request">Donation Request</NavLink>
            <NavLink to="/search-donors">Search Donors</NavLink>
            {/* Condition redering */}

            {userType === "admin" ? (
              <>
                <NavLink to="/dashboard/adminhome">Dashboard</NavLink>
              </>
            ) : userType === "donor" ? (
              <NavLink to="/dashboard/donorhome">Dashboard</NavLink>
            ) : userType === "volunteer" ? (
              <NavLink to="/dashboard/volunteerhome">Dashboard</NavLink>
            ) : (
              <></>
            )}
          </ul>
        </div>

        <div className="navbar-center flex items-end gap-2">
          <img src={logo} className="w-10 lg:w-[56px]" />
          <h1 className="text-xl lg:text-3xl">Life Flow</h1>
        </div>

        <div className="navbar-end gap-5">
          <div className="hidden lg:block">
            {user ? (
              <div className="dropdown">
                <img
                  src={userData.photo}
                  tabIndex={0}
                  className="w-10 rounded-full"
                />
                <div
                  tabIndex={0}
                  className="text-center absolute right-0 dropdown-content mt-3 z-[1] p-2 shadow-xl rounded-box w-72 space-y-3 bg-white"
                >
                  <div className="bg-red-500 p-5 rounded-xl text-xl text-white">
                    <h1>{userData.name}</h1>
                  </div>
                  <ul className="flex flex-col">
                    {userType === "admin" ? (
                      <>
                        <NavLink to="/dashboard/adminhome">Dashboard</NavLink>
                      </>
                    ) : userType === "donor" ? (
                      <>
                        <NavLink to="/dashboard/donorhome">Dashboard</NavLink>{" "}
                        <NavLink to="/dashboard/donorfundfororganization">
                          Fundings
                        </NavLink>
                      </>
                    ) : userType === "volunteer" ? (
                      <NavLink to="/dashboard/volunteerhome">Dashboard</NavLink>
                    ) : (
                      <></>
                    )}
                  </ul>
                  <button
                    className="px-3 py-2 bg-red-500 text-white rounded-full"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="hidden md:block md:px-2 md:py-1 lg:px-6 lg:py-2 bg-red-500 text-white rounded-full text-[18px] transition-colors duration-700 hover:bg-green-500">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
