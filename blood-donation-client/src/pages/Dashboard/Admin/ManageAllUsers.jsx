import { useContext, useEffect, useState } from "react";
import { SecurityContext } from "../../../Provider/SecurityProvider";
import { NotificationContext } from "../../../hooks/Notification";
import useAxiosSecure from "../../../API/useAxiosSecure";
import SingleUserData from "../../../Components/SingleUserData";
import useManageAllUsers from "../../../API/useManageAllUsers";
import { Helmet } from "react-helmet";

const ManageAllUsers = () => {
  const { user } = useContext(SecurityContext);
  const [handleRefech, setHandleRefetch] = useState(true);
  const { handleSuccessToast, handleErrorToast } =
    useContext(NotificationContext);
  const [refetch, allUsers] = useManageAllUsers();
  const axiosSecure = useAxiosSecure();

  // pagination concept
  const [paginationDataHolder, setPaginationDataHolder] = useState([]);
  const [catagory, setCatagory] = useState("active");
  const [currentPage, setCurrentPage] = useState(0);
  let itemsperpage = 3;
  const numebrOfPages = Math.ceil(allUsers.length / itemsperpage);
  const pages = [...Array(numebrOfPages).keys()];

  const handleChangeCatagory = (e) => {
    e.preventDefault();
    setCatagory(e.target.value);
  };

  // update user status
  const handleUpdateUserStatus = (userId, status) => {
    console.log("Status Change", userId, status);
    axiosSecure
      .patch(
        `/manage-user-status?userId=${userId}&status=${status}&email=${user.email}`
      )
      .then((res) => {
        if (res.data.data.acknowledged) {
          // setShowChangeStatusModal(false);
          handleSuccessToast("User status updated successfully!");
          setHandleRefetch(!handleRefech);
          refetch();
        } else {
          handleErrorToast("An error occured during updating user status!");
        }
      });
  };

  //   update user role
  const handleUpdateUserRole = (userId, role) => {
    axiosSecure
      .patch(
        `/manage-user-role?userId=${userId}&role=${role}&email=${user.email}`
      )
      .then((res) => {
        if (res.data.data.acknowledged) {
          handleSuccessToast("User role updated successfully!");
          setHandleRefetch(!handleRefech);
          refetch();
        } else {
          handleErrorToast("An error occured during updating user role!");
        }
      });
  };

  // fetching data using pagination
  useEffect(() => {
    axiosSecure
      .get(
        `/fetch-users-by-paginations?email=${user.email}&currentpage=${currentPage}&catagory=${catagory}`
      )
      .then((res) => setPaginationDataHolder(res.data.data));
  }, [axiosSecure, currentPage, user.email, catagory, handleRefech]);

  return (
    <div className="w-[90%] h-[100vh] lg:h-[80vh] lg:w-[90vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5">
      <Helmet>
        <title>Life Flow : Manage All Users</title>
      </Helmet>
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl font-semibold ">
        Manage Users
      </h1>
      <div className="flex flex-col">
        <div className="h-[500px]">
          {allUsers.length === 0 ? (
            <h1 className="text-xl md:text-2xl lg:text-3xl text-red-500 font-semibold text-center mt-60">
              No users found
            </h1>
          ) : (
            <div className="h-3/4 w-full py-5">
              <form>
                <div className="">
                  <label
                    className="ml-2 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="bloodgroup"
                  >
                    Sort By
                  </label>
                  <select
                    onChange={handleChangeCatagory}
                    className="ml-5 text-[12px] md:text-[15px] px-2 py-1 md:py-2 bg-red-50 outline-none"
                    name="bloodgroup"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </form>
              <div className="overflow-x-auto ">
                <table className="table table-lg space-y-5">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Photo</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>User Type</th>
                      <th>Change Status</th>
                      <th>Make Volunteer</th>
                      <th>Make Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginationDataHolder?.slice(0, 3).map((i, idx) => (
                      <SingleUserData
                        key={i._id}
                        number={idx}
                        data={i}
                        refetch={refetch}
                        handleUpdateUserStatus={handleUpdateUserStatus}
                        handleUpdateUserRole={handleUpdateUserRole}
                      ></SingleUserData>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>No.</th>
                      <th>Photo</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>User Type</th>
                      <th>Change Status</th>
                      <th>Make Volunteer</th>
                      <th>Make Admin</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="row-span-1">
          {/* pagination */}
          <div className="pagination  mt-10 ml-5">
            <span className="text-xl font-semibold">Pages: </span>
            {pages.map((i, idx) => (
              <button
                onClick={() => setCurrentPage(i)}
                className={currentPage === i && "selected"}
                // className="mr-5 px-3 py-1  text-white rounded-md"
                key={idx}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAllUsers;
