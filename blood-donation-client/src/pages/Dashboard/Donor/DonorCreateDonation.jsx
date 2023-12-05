import { useContext, useState,useEffect } from "react";
import useDistrictsData from "../../../API/useDistrictsData";
import useUserData from "../../../API/useUserData";
import useAxiosPublic from "../../../API/useAxiosPublic";
import { NotificationContext } from "../../../hooks/Notification";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { SecurityContext } from "../../../Provider/SecurityProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

const DonorCreateDonation = () => {
  const { user } = useContext(SecurityContext);
  const { handleSuccessToast, handleErrorToast } =
    useContext(NotificationContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [, userData] = useUserData();
  const [districtData] = useDistrictsData();
  const [upazilaData, setUpazilaData] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);
  // getting upazila data based on districts
  const handleGetUpazilas = (e) => {
    e.preventDefault();
    const userDistricts = e.target.value;
    axiosPublic
      .post(`/upazilas?userDistricts=${userDistricts}`)
      .then((res) => setUpazilaData(res.data.data));
  };

  const handleCreateDonationRequest = (e) => {
    e.preventDefault();
    if (userData.status === "active") {
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
      const status = "pending";

      // formatting time
      const formatedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(time);

      if (
        currentrecipientdistrict === "none" &&
        currentrecipientupazila === "none"
      ) {
        handleErrorToast("Please add your district and upazila");
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
          donorname: "null",
          donoremail: "null",
          status,
        };
        axiosSecure
          .post(`/createdonationrequests?email=${user.email}`, donationRequest)
          .then((res) => {
            if (res.data.success) {
              handleSuccessToast("Donation request created successfully!");
              form.reset();
            } else {
              handleErrorToast(
                "This account is blocked. And can't create donation request!"
              );
            }
          });
      }
    } else {
      handleErrorToast("Your account is blocked. Can't create donate request!");
    }
  };

  return (
    <div>
            <Helmet>
        <title>Life Flow : Create Donation Request</title>
      </Helmet>
      <div className="w-[90%] lg:w-[80vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5">
        <div>
          <h1 className="text-center font-semibold text-xl lg:text-4xl">
            Create Donation Reaquest
          </h1>
          <form data-aos="fade-up" data-aos-duration="1500" onSubmit={handleCreateDonationRequest} className="py-10">
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
                    className="font-semibold col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                    disabled
                    defaultValue={userData.name}
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
                    className="font-semibold col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none disabled:cursor-not-allowed"
                    disabled
                    defaultValue={userData.email}
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
              value="Request"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorCreateDonation;
