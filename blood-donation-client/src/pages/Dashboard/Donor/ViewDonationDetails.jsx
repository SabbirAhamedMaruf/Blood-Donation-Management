import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserData from "../../../API/useUserData";
import { NotificationContext } from "../../../hooks/Notification";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { SecurityContext } from "../../../Provider/SecurityProvider";

const ViewDonationDetails = () => {
  const { user } = useContext(SecurityContext);
  const navigate = useNavigate();
  const { handleSuccessToast, handleErrorToast } =
    useContext(NotificationContext);
  const [, userData] = useUserData();
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [currentDonationData, setCurrentDonationData] = useState([]);
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    requestername,
    requesteremail,
    recipientname,
    recipientdistrict,
    recipientupazila,
    bloodgroup,
    hospitalname,
    address,
    donationdate,
    donationtime,
    requestmessage,
  } = currentDonationData;
  // getting donation data
  useEffect(() => {
    axiosSecure
      .get(
        `/getsingledonationdata?donationDataId=${params.id}&email=${user.email}`
      )
      .then((res) => setCurrentDonationData(res.data.data));
  }, [axiosSecure, params.id, setCurrentDonationData, user.email]);

  //   Donating blood accpetance api
  const handleDonate = (donationId) => {
    const updateDonorInfo = {
      donorname: userData.name,
      donoremail: userData.email,
      status: "inprogress",
    };
    axiosSecure
      .patch(`/donateblood?donationDataId=${donationId}`, updateDonorInfo)
      .then((res) => {
        if (res.data.data.acknowledged) {
          handleSuccessToast(
            "Thanks for your kindness. Please visit recipient!"
          );
          setShowDonateModal(false);
          navigate("/dashboard/donorhome");
        } else {
          handleErrorToast("An error occured during confirmation!");
        }
      });
  };

  return (
    <div>
      <div className="w-[90%] lg:w-[80vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5">
        <div>
          <h1 className="text-center font-semibold text-xl lg:text-4xl ">
            Donation Reaquest Details
          </h1>
          <section className="py-10">
            <div className="flex flex-col lg:flex-row justify-around p-3 text-[12px] md:text-[15px]">
              <div className="space-y-2 md:space-y-3 lg:space-y-10">
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="requestername"
                  >
                    Requester Name
                  </label>
                  <input
                    defaultValue={requestername}
                    className="font-semibold col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                    disabled
                    type="text"
                    name="requestername"
                    placeholder="Enter requester name"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="requesteremail"
                  >
                    Requester Email
                  </label>
                  <input
                    defaultValue={requesteremail}
                    className="font-semibold col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                    disabled
                    type="email"
                    name="requesteremail"
                    placeholder="Enter requester email"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="recipientname"
                  >
                    Recipient Name
                  </label>
                  <input
                    defaultValue={recipientname}
                    disabled
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                    type="text"
                    name="recipientname"
                    placeholder="Enter recipient name"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="recipientdistrict"
                  >
                    Recipient District
                  </label>
                  <input
                    disabled
                    className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none disabled:cursor-not-allowed"
                    defaultValue={recipientdistrict}
                    type="text"
                    name="recipientdistrict"
                  />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2  text-[15px] lg:text-xl font-semibold"
                    htmlFor="recipientupazila"
                  >
                    Recipient Upazila
                  </label>
                  <input
                    disabled
                    className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none disabled:cursor-not-allowed"
                    defaultValue={recipientupazila}
                    type="text"
                    name="recipientdistrict"
                  />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="bloodgroup"
                  >
                    Blood Group
                  </label>
                  <select
                    disabled
                    value={bloodgroup}
                    className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none disabled:cursor-not-allowed"
                    name="bloodgroup"
                    required
                  >
                    <option value="none">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3 lg:space-y-10">
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="hospitalname"
                  >
                    Hospital Name
                  </label>
                  <input
                    disabled
                    defaultValue={hospitalname}
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                    type="text"
                    name="hospitalname"
                    placeholder="Enter requester name"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    disabled
                    defaultValue={address}
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                    type="text"
                    name="address"
                    placeholder="Enter recipient address"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="donationdate"
                  >
                    Donation Date
                  </label>
                  <input
                    disabled
                    defaultValue={donationdate}
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                    type="date"
                    name="donationdate"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="donationtime"
                  >
                    Donation Time
                  </label>
                  <input
                    disabled
                    className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none disabled:cursor-not-allowed"
                    defaultValue={donationtime}
                    type="text"
                    name="recipientdistrict"
                  />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="requestmessage"
                  >
                    Request Message
                  </label>
                  <textarea
                    disabled
                    defaultValue={requestmessage}
                    placeholder="Why you need blood?"
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                    name="requestmessage"
                    id=""
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
          <div>
            {/* My Custom Modal */}
            <button
              onClick={() => setShowDonateModal(true)}
              className="ml-[38%] md:ml-[42%] lg:ml-[6%] px-4 text-center text-xl text-white font-bold rounded-full  py-1 lg:py-2 bg-red-500 transition-colors duration-700 hover:bg-green-500"
            >
              Donate
            </button>
            {showDonateModal && (
              <div>
                <div className="fixed inset-0 bg-[rgba(22,22,22,0.8)] z-10">
                  <div className="fixed top-[30%] left-[18%] md:left-[30%] lg:left-[35%] p-2 md:p-5 lg:p-10 space-y-10 bg-white rounded-xl ">
                    <h3 className="font-bold text-2xl text-left">
                      Wanted to donate?
                    </h3>
                    <div>
                      <form className="flex flex-col space-y-5 lg:space-y-10">
                        <div className=" items-center gap-4 grid grid-cols-5 lg:grid-cols-7">
                          <label
                            className="text-[15px] lg:text-xl font-semibold"
                            htmlFor="email"
                          >
                            Name
                          </label>
                          <input
                            disabled
                            defaultValue={userData.name}
                            className=" col-span-4 lg:col-span-6 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                            type="text"
                            name="name"
                          />
                        </div>

                        <div className=" items-center gap-4 grid grid-cols-5 lg:grid-cols-7">
                          <label
                            className="text-[15px] lg:text-xl font-semibold"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            disabled
                            defaultValue={userData.email}
                            className="col-span-4 lg:col-span-6 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                            type="email"
                            name="email"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="flex justify-center gap-10">
                      <button
                        onClick={() => handleDonate(params.id)}
                        className="px-4 py-2 bg-orange-300 rounded-md outline-none text-white font-semibold  text-xl duration-700 hover:bg-green-300"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setShowDonateModal(false)}
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
        </div>
      </div>
    </div>
  );
};

export default ViewDonationDetails;
