import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../API/useAxiosPublic";
import useDistrictsData from "../../../API/useDistrictsData";
import {  useParams } from "react-router-dom";
import { NotificationContext } from "../../../hooks/Notification";
import { SecurityContext } from "../../../Provider/SecurityProvider";
import useAxiosSecure from "../../../API/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";

const UpdateDonationData = () => {
  const {user}=useContext(SecurityContext);
  console.log(user)
  const { handleSuccessToast, handleErrorToast } =
    useContext(NotificationContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure= useAxiosSecure();
  const [districtData] = useDistrictsData();
  const [upazilaData, setUpazilaData] = useState([]);
  const params = useParams();
  const [currentDonationData, setCurrentDonationData] = useState([]);

  const {
    recipientname,
    bloodgroup,
    hospitalname,
    address,
    donationdate,
    requestmessage,
  } = currentDonationData;

  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);
  // getting donation data
  useEffect(() => {
    axiosSecure
      .get(`/getsingledonationdata?donationDataId=${params.id}&email=${user.email}`)
      .then((res) => setCurrentDonationData(res.data.data));
  }, [axiosSecure, params.id, setCurrentDonationData,user.email]);



  // getting upazila data based on districts
  const handleGetUpazilas = (e) => {
    e.preventDefault();
    const userDistricts = e.target.value;
    axiosPublic
      .post(`/upazilas?userDistricts=${userDistricts}`)
      .then((res) => setUpazilaData(res.data.data));
  };

  //   updating donation request
  const handleDonationDataUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const currentrequestername = form.requestername.value;
    const currentrequesteremail = form.requesteremail.value;
    const currentrecipientname = form.recipientname.value;
    const currentrecipientdistrict = form.recipientdistrict.value;
    const currentrecipientupazila = form.recipientupazila.value;
    const currentbloodgroup = form.bloodgroup.value;
    const currenthospitalname = form.hospitalname.value;
    const currentaddress = form.address.value;
    const currentdonationdate = form.donationdate.value;
    const currentdonationtime = form.donationtime.value;
    const currentrequestmessage = form.requestmessage.value;
    const time = new Date(`${currentdonationdate}T${currentdonationtime}`);

    // formatting time
    const formatedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(time);

    if (currentrecipientdistrict === "none") {
      handleErrorToast("Please add your district");
    } else if (currentrecipientupazila === "none") {
      handleErrorToast("Please add your upazila");
    } else {
      const donationRequest = {
        requestername: currentrequestername,
        requesteremail: currentrequesteremail,
        recipientname: currentrecipientname,
        recipientdistrict: currentrecipientdistrict,
        recipientupazila: currentrecipientupazila,
        bloodgroup: currentbloodgroup,
        hospitalname: currenthospitalname,
        address: currentaddress,
        donationdate: currentdonationdate,
        donationtime: formatedTime,
        requestmessage: currentrequestmessage,
      };

      axiosSecure
        .patch(
          `/updatedonationrequestsdata?donationDataId=${params.id}&email=${user.email}`,
          donationRequest
        )
        .then((res) => {
          if (res.data.data.acknowledged) {
            handleSuccessToast("Donation data updated successfully!");
          } else {
            handleErrorToast("An error occured during updating donation data!");
          }
        });
    }
  };

  return (
    <div>
      <div className="w-[90%] lg:w-[80vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5">
        <div>
          <h1 className="text-center font-bold text-xl lg:text-4xl ">
            Update Donation Reaquest
          </h1>
          <form data-aos="fade-up" data-aos-duration="1500" onSubmit={handleDonationDataUpdate} className="py-10">
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
                    defaultValue={user.displayName}
                    className="font-semibold col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
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
                    defaultValue={user.email}
                    className="font-semibold col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
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
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
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
                  <select
                    className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none"
                    name="recipientdistrict"
                    required
                    onChange={handleGetUpazilas}
                  >
                    <option value="none">Select your district</option>
                    {districtData?.map((i) => (
                      <option key={i._id} value={i.name}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2  text-[15px] lg:text-xl font-semibold"
                    htmlFor="recipientupazila"
                  >
                    Recipient Upazila
                  </label>
                  <select
                    className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none"
                    name="recipientupazila"
                    required
                  >
                    <option value="none">Select your upazila</option>
                    {upazilaData?.map((i) => (
                      <option key={i._id} value={i.name}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  <label
                    className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                    htmlFor="bloodgroup"
                  >
                    Blood Group
                  </label>
                  <select
                    value={bloodgroup}
                    className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none"
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
                    defaultValue={hospitalname}
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
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
                    defaultValue={address}
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
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
                    defaultValue={donationdate}
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
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
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
                    type="time"
                    name="donationtime"
                    required
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
                    defaultValue={requestmessage}
                    placeholder="Why you need blood?"
                    className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
                    name="requestmessage"
                    id=""
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
            <input
              className="ml-[38%] md:ml-[42%] lg:ml-[6%] px-4 text-center text-xl text-white font-bold rounded-full  py-1 lg:py-2 bg-red-500 transition-colors duration-700 hover:bg-green-500"
              type="submit"
              value="Update"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDonationData;

