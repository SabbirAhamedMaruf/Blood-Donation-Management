import { FaUserGroup } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BiSolidDonateBlood } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { SecurityContext } from "../../../Provider/SecurityProvider";
import useUserData from "../../../API/useUserData";
import useAxiosSecure from "../../../API/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

const VolunteerHome = () => {
  const { user } = useContext(SecurityContext);
  const [, userData] = useUserData();
  const axiosSecure = useAxiosSecure();
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`/volunteertatistics?email=${user.email}`)
      .then((res) => setStatistics(res.data.data));
  }, [axiosSecure, user.email]);

  console.log(statistics);

  return (
    <div>
      <Helmet>
        <title>Life Flow : Dashboard</title>
      </Helmet>
      <div className="w-[90%] h-[100vh] lg:h-[80vh] lg:w-[90vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5">
        <div>
          <h1 className="h-1/4 text-center text-xl md:text-2xl lg:text-4xl font-semibold my-10">
            Welcome {userData.name}
          </h1>

          <h1 className="h-1/4 text-center text-xl md:text-2xl lg:text-4xl font-semibold my-10">
            Current Statistics
          </h1>
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="lg:mt-20 flex flex-col lg:flex-row justify-around items-center gap-5"
          >
            <div className="md:w-full  flex items-center shadow-2xl p-5 lg:p-10 rounded-xl bg-gray-50">
              <FaUserGroup className="text-[100px] text-white bg-red-500 p-5 rounded-xl" />
              <div className="card-body">
                <h2 className="text-4xl">{statistics.totalUser}</h2>
                <h2 className="card-title">Total Users</h2>
              </div>
            </div>

            <div className="md:w-full flex items-center shadow-2xl p-5 lg:p-10 rounded-xl bg-gray-50">
              <RiMoneyDollarCircleFill className="text-[100px] text-white bg-blue-500 p-5 rounded-xl" />
              <div className="card-body">
                <h2 className="text-4xl">{statistics.totalDonation}</h2>
                <h2 className="card-title">Total Funds</h2>
              </div>
            </div>

            <div className="w-[72vw] md:w-full flex items-center shadow-2xl p-5 lg:p-10 rounded-xl bg-gray-50">
              <BiSolidDonateBlood className="text-[100px] text-white bg-green-500 p-5 rounded-xl" />
              <div className="card-body">
                <h2 className="text-4xl">{statistics.sum}</h2>
                <h2 className="card-title">Total Blood Donation</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHome;
