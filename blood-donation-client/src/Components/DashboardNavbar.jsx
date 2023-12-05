import { NavLink } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import useUserType from "../API/useUserType";
import useUserData from "../API/useUserData";

const DashboardNavbar = () => {
  const [, userData] = useUserData();
  const [userType] = useUserType();

  return (
    <div className="pt-2 shadow-lg">
      <div className="navbar  w-[90%] m-auto">
        <div className="navbar-start">
          {/* Drawer */}
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className=" drawer-button">
                <HiMenuAlt1 className="text-2xl" />
              </label>
            </div>

            <div className="drawer-side z-30">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              {/* Sidebar menu content */}
              <div className="text-center menu p-4 w-80 min-h-full bg-white text-base-content">
                <h1 className="font-bold text-3xl lg:text-3xl">Dashboard</h1>
                <div className="my-5 flex justify-between items-center bg-red-500 p-3 rounded-2xl">
                  <h1 className="text-2xl text-white font-bold">
                    {userData?.name}
                  </h1>
                  <img src={userData?.photo} className="w-16" />
                </div>
                <div className="space-y-3 mt-5 pt-5 text-[16px] font-bold  shadow-slate-200">
                  <ul className="dashboardSideBar text-center">
                    {/* Shared Routes */}
                    <div className="mb-5">
                      <NavLink to="/dashboard/profile">
                        <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                          Profile
                        </button>
                      </NavLink>
                    </div>

                    {/* Admin routes */}
                    {userType === "admin" ? (
                      <ul className="flex flex-col gap-5">
                        <NavLink to="/dashboard/adminhome">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            Home
                          </button>
                        </NavLink>

                        <NavLink to="/dashboard/all-users">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            Manage Users
                          </button>
                        </NavLink>

                        <NavLink to="/dashboard/all-blood-donation-request">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            All Blood Donations
                          </button>
                        </NavLink>
                        <NavLink to="/dashboard/content-management">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            Content Management
                          </button>
                        </NavLink>


                      </ul>
                    ) : // user routes

                    userType === "donor" ? (
                      <ul className="flex flex-col gap-5">
                        <NavLink to="/dashboard/donorhome">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            Home
                          </button>
                        </NavLink>
                        <NavLink to="/dashboard/my-donation-requests">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            My Donation Requests
                          </button>
                        </NavLink>
                        <NavLink to="/dashboard/create-donation-request">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            Create Donation Request
                          </button>
                        </NavLink>
                        <NavLink to="/dashboard/donorfundfororganization">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            Funding
                          </button>
                        </NavLink>
                      </ul>
                    ) : // Volunteer  routes

                    userType === "volunteer" ? (
                      <ul className="flex flex-col gap-5">
                        <NavLink to="/dashboard/volunteerhome">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            Home
                          </button>
                        </NavLink>
                        <NavLink to="/dashboard/all-blood-donation-request">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            All Blood Donations
                          </button>
                        </NavLink>
                        <NavLink to="/dashboard/content-management">
                          <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                            Content Management
                          </button>
                        </NavLink>
                      </ul>
                    ) : (
                      // else method
                      <></>
                    )}
                  </ul>
                  <div className="border-b-2 border-black opacity-25 w-[80%] m-auto"></div>
                  <ul>
                    <NavLink to="/">
                      <button className="w-full py-2 rounded-full text-black transition-all duration-300 hover:text-white hover:bg-red-500">
                        Home
                      </button>
                    </NavLink>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end gap-5">
          <h1 className="text-xl font-bold">{userData.name}</h1>
          <img src={userData?.photo} className="w-10" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;

// TODO fix this bound refetch
