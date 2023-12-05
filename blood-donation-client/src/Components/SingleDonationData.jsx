import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useUserType from "../API/useUserType";
// import { useContext } from "react";
// import { SecurityContext } from "../Provider/SecurityProvider";
const SingleDonationData = ({
  showDeleteModal,
  setShowDeleteModal,
  showChangeStatusModal,
  setShowChangeStatusModal,
  handleDeleteDonationData,
  handleUpdateDonationStatus,
  number,
  data,
}) => {
  // const {user}= useContext(SecurityContext);
  console.log(data)
  const [userType] = useUserType();
  return (
    <tr>
      <th>{number + 1}</th>
      <td>{data.recipientname}</td>
      <td>
        <>
          <p>District:{data.recipientdistrict}</p>
          <br />
          <p>Name:{data.recipientupazila}</p>
        </>
      </td>
      <td>{data.donationdate}</td>
      <td>{data.donationtime}</td>
      <td>
        {data.status === "pending" ? (
          <>
            <span className="px-3 py-1 bg-orange-500 text-white rounded-full">
              {data.status}
            </span>
          </>
        ) : data.status === "inprogress" ? (
          <>
            <span className="px-3 py-1 bg-green-500 text-white rounded-full">
              {data.status}
            </span>
          </>
        ) : data.status === "Canceled" ? (
          <>
            <span className="px-3 py-1 bg-red-500 text-white rounded-full">
              {data.status}
            </span>
          </>
        ) : data.status === "done" ? (
          <>
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full">
              {data.status}
            </span>
          </>
        ) : (
          <></>
        )}
      </td>
      <td>
        {data.donorname === "null" ? (
          "Not available"
        ) : (
          <>
            <p>Name:{data.donorname}</p>
            <br />
            <p>Name:{data.donoremail}</p>
          </>
        )}
      </td>
      <td>
        {userType !== "volunteer"  && (
          <Link to={`/dashboard/update-donation-request/${data._id}`}>
            <button className="px-2 py-1 bg-yellow-500 text-white rounded-md">
              Edit
            </button>
          </Link>
         )} 
      </td>
      <td>
        {userType !== "volunteer" && (
          <div>
            {/* My Custom Modal */}
            <button
              className="px-2 py-1 bg-red-500 text-white rounded-md"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
            {showDeleteModal && (
              <div>
                <div className="fixed inset-0 bg-[rgba(22,22,22,0.4)] z-10">
                  <div className="fixed top-[35%] left-[40%] p-10 space-y-10 bg-white rounded-xl ">
                    <h3 className="font-bold text-2xl text-left">
                      Delete donation data?
                    </h3>
                    <div className="flex justify-center gap-10">
                      <button
                        onClick={() => handleDeleteDonationData(data._id)}
                        className="px-4 py-2 bg-orange-300 rounded-md outline-none text-white font-semibold  text-xl duration-700 hover:bg-green-300"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(false)}
                        className="px-4 py-2 bg-red-500 rounded-md outline-none text-white font-semibold  text-xl duration-700 hover:bg-green-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )} 
      </td>
      <td>
        {data.status === "pending" ?(
          <Link to={`/dashboard/view-donation-details/${data._id}`}>
            <button className="px-2 p-1 bg-green-500 text-white rounded-md">
              Details
            </button>
          </Link>
        ) : data.status==="inprogress"?(
          <div>
            {/* My Custom Modal */}
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded-md"
              onClick={() => setShowChangeStatusModal(true)}
            >
              Update
            </button>
            {showChangeStatusModal && (
              <div>
                <div className="fixed inset-0 bg-[rgba(22,22,22,0.8)] z-10">
                  <div className="fixed top-[35%] left-[40%] p-10 space-y-10 bg-white rounded-xl ">
                    <h3 className="font-bold text-2xl text-left">
                      Current Donation Status?
                    </h3>
                    <div className="flex justify-center gap-10">
                      <button
                        onClick={() =>
                          handleUpdateDonationStatus(data._id, "done")
                        }
                        className="px-4 py-2 bg-orange-300 rounded-md outline-none text-white font-semibold  text-xl duration-700 hover:bg-green-300"
                      >
                        Done
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateDonationStatus(data._id, "Canceled")
                        }
                        className="px-4 py-2 bg-orange-300 rounded-md outline-none text-white font-semibold  text-xl duration-700 hover:bg-green-300"
                      >
                        Canceled
                      </button>
                      <button
                        onClick={() => setShowChangeStatusModal(false)}
                        className="px-4 py-2 bg-red-500 rounded-md outline-none text-white font-semibold  text-xl duration-700 hover:bg-green-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : ""}
      </td>
    </tr>
  );
};
SingleDonationData.propTypes = {
  showDeleteModal: PropTypes.bool,
  setShowDeleteModal: PropTypes.func,
  showChangeStatusModal: PropTypes.bool,
  setShowChangeStatusModal: PropTypes.func,
  handleDeleteDonationData: PropTypes.func,
  handleUpdateDonationStatus: PropTypes.func,
  number: PropTypes.number,
  data: PropTypes.object,
};

export default SingleDonationData;
