import { useContext, useState } from "react";
import axios from "axios";
import useUserData from "../../../API/useUserData";
import profileUpdatebanner from "../../../assets/profileUpdate.jpg";
import useDistrictsData from "../../../API/useDistrictsData";
import { MdExitToApp } from "react-icons/md";
import { NotificationContext } from "../../../hooks/Notification";
import useAxiosSecure from "../../../API/useAxiosSecure";
import useAxiosPublic from "../../../API/useAxiosPublic";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";


const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGEBB_API
}`;
const Profile = () => {
  const { handleSuccessToast, handleErrorToast } =
    useContext(NotificationContext);
  const [upazilaData, setUpazilaData] = useState([]);
  const [districtData] = useDistrictsData();
  const [refetch,userData] = useUserData();
  const [open, setOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

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

  const handleUpdateData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const currentName = form.name.value;
    const userDistrict = form.district.value;
    const userUpazila = form.upazila.value;
    const userBloodGroup = form.bloodgroup.value;


    // getting image data
    const formData = new FormData();
    formData.append("image", form.photo.files[0]);
    const response = await axios.post(imageHostingAPI, formData);
    const updatedUserData = {
      name: currentName,
      photo: response.data.data.display_url,
      district: userDistrict,
      upazila: userUpazila,
      bloodgroup: userBloodGroup,
    };
    await axiosSecure
      .post(`/user/updateProfile/${userData._id}`, updatedUserData)
      .then((res) => {
        if (res.data.data.acknowledged) {
          handleSuccessToast("User updated successfully!");
          setOpen(false);
          refetch();
        } else {
          handleErrorToast(
            "An error occured during updating user information!"
          );
        }
      });
  };

  return (
    <div>
            <Helmet>
        <title>Life Flow : Profile</title>
      </Helmet>
      <div className="w-[90%] lg:h-[80vh] lg:w-[80vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5  flex flex-col lg:flex-row gap-10 md:gap-5 lg:gap-20">
        <div className="p-5 lg:w-1/2 shadow-2xl h-full flex flex-col justify-center items-center gap-10 rounded-xl">
          <img src={profileUpdatebanner} className="" />

          <div>
            <button
              className="px-5 py-2 bg-red-500 text-white font-bold rounded-full"
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </button>
            {open && (
              <div>
                <div className="fixed inset-0 bg-[rgba(22,22,22,0.8)] z-10">
                  <div className="fixed top-[25%] left-[22%] p-10 space-y-10 bg-white rounded-xl ">
                    <h3 className="font-bold text-2xl text-left">
                      Update Profile
                    </h3>
                    <div>
                      <form
                        method="dialog"
                        onSubmit={handleUpdateData}
                        className="grid grid-cols-2 gap-6 p-3 text-[12px] md:text-[15px]"
                      >
                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                          <label
                            className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <input
                            className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                          <label
                            className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                            htmlFor="photo"
                          >
                            Photo
                          </label>
                          <input
                            type="file"
                            className="py-2 px-2 col-span-2 md:col-span-3 lg:col-span-5   border-none bg-red-50"
                            name="photo"
                            accept=".png, .jpg, .jpeg"
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

                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                          <label
                            className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                            htmlFor="district"
                          >
                            District
                          </label>
                          <select
                            className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none"
                            name="district"
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
                            htmlFor="upazila"
                          >
                            Upazila
                          </label>
                          <select
                            className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none"
                            name="upazila"
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

                        <div className="flex justify-center gap-10">
                          <input
                            className="w-full text-center text-xl text-white font-bold rounded-full  py-1 lg:py-2 bg-red-500 disabled:cursor-not-allowed"
                            type="submit"
                            value="Update Profile"
                          />
                          <button
                            onClick={() => setOpen(false)}
                            className="px-3 p-2 bg-red-500 rounded-full outline-none text-white font-semibold  text-xl duration-700 hover:bg-green-500"
                          >
                            <MdExitToApp />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div data-aos="fade-left" data-aos-duration="1500" className="p-5 md:p-0 lg:w-1/2 flex flex-col justify-center items-center lg:items-left lg:text-2xl gap-5 lg:gap-10">
          <img src={userData.photo} className="w-20" />
          <h1>
            <span className="font-bold">Name :</span> {userData.name}
          </h1>
          <h1>
            <span className="font-bold">Email :</span> {userData.email}
          </h1>
          <h1>
            <span className="font-bold">Blood Group :</span>{" "}
            {userData.bloodgroup}
          </h1>
          <h1>
            <span className="font-bold">District :</span> {userData.district}
          </h1>
          <h1>
            <span className="font-bold">Upazila : </span>
            {userData.upazila}
          </h1>
          <h1>
            <span className="font-bold">Type : </span>
            {userData.userType}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;



