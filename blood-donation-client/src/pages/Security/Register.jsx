import { Link, useNavigate } from "react-router-dom";
import registerlogo from "../../assets/register.png";
import { useContext, useEffect, useState } from "react";
import { SecurityContext } from "../../Provider/SecurityProvider";
import { NotificationContext } from "../../hooks/Notification";
import axios from "axios";
import useAxiosPublic from "../../API/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import useDistrictsData from "../../API/useDistrictsData";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGEBB_API
}`;

const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  // getting form field data
  const [districtData] = useDistrictsData();
  const [upazilaData, setUpazilaData] = useState([]);

  // handling error
  const [error, setError] = useState("");

  // password validation
  const [password, setPassword] = useState(null);
  const [confrimPassword, setConfirmPassword] = useState(null);

  // form submit button state
  const [disable, setDisable] = useState(true);

  // notification
  const { handleSuccessToast } = useContext(NotificationContext);
  const { registerWithEmailAndPassword, handleSignOut } =
    useContext(SecurityContext);

  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);

  // getting password value
  const handleSetPassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleSetConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  // password and confirn password validation
  useEffect(() => {
    if (password === confrimPassword) {
      setDisable(false);
      setError("");
    } else {
      setDisable(true);
      setError("Password does not matched!");
    }
  }, [password, confrimPassword]);

  // getting upazila data based on districts
  const handleGetUpazilas = (e) => {
    e.preventDefault();
    const userDistricts = e.target.value;
    axiosPublic
      .post(`/upazilas?userDistricts=${userDistricts}`)
      .then((res) => setUpazilaData(res.data.data));
  };

  // User registration handler
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const currentName = form.name.value;
    const currentEmail = form.email.value;
    const currentPassword = form.password.value;
    const currentBloodGroup = form.bloodgroup.value;
    const currentDistrict = form.district.value;
    const currentUpazila = form.upazila.value;
    const userType = "donor";
    const status = "active";
    // getting image data
    const formData = new FormData();
    formData.append("image", form.photo.files[0]);

    setError("");
    // Simple password validation
    if (password.length < 6) {
      setError("Password should contain 6 character!");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password should contain at least one uppercase letter!");
      return;
    } else if (!/[$#&|@%*]/.test(password)) {
      setError("Password should contain at least one special letter [$#&|@%*]");
      return;
    } else if (currentBloodGroup === "none") {
      setError("Please select your blood group!");
    } else if (currentDistrict === "none") {
      setError("Please select your district!");
    } else if (currentUpazila === "none") {
      setError("Please select your upazilla!");
    } else {
      const response = await axios.post(imageHostingAPI, formData);
      // Register user with firebase
      await registerWithEmailAndPassword(currentEmail, currentPassword)
        .then((result) => {
          if (result.user) {
            updateProfile(result.user, {
              displayName: currentName,
              photoURL: response.data.data.display_url,
            });
            // Saving user information inside database
            // user template
            const currentUserData = {
              name: currentName,
              email: currentEmail,
              photo: response.data.data.display_url,
              bloodgroup: currentBloodGroup,
              district: currentDistrict,
              upazila: currentUpazila,
              userType: userType,
              status: status,
            };
            axiosPublic.post("/users", currentUserData).then(() => {
              handleSignOut();
              handleSuccessToast("User created successfully!");
              // Resetting form
              form.reset();
              setPassword(null);
              setConfirmPassword(null);
              navigate("/login");
            });
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Life Flow : Register</title>
      </Helmet>
      <div className="w-[90%] lg:w-[80vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5 flex flex-col lg:flex-row gap-10 md:gap-5 lg:gap-20">
        <div className="lg:w-1/2">
          <img
            src={registerlogo}
            className="shadow-lg lg:shadow-xl rounded-lg"
          />
        </div>
        <div data-aos="fade-left" data-aos-duration="1500" className="lg:w-1/2">
          <h1 className="text-center font-bold text-xl lg:text-4xl my-10">
            Register
          </h1>
          <form
            onSubmit={handleRegisterUser}
            className="space-y-3 p-3 text-[12px] md:text-[15px]"
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
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
              <label
                className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={handleSetPassword}
                className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
              <label
                className="col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                htmlFor="confirmpassword"
              >
                Confirm Password
              </label>
              <input
                onChange={handleSetConfirmPassword}
                className="col-span-2 md:col-span-3 lg:col-span-5 px-2 py-2 bg-red-50 outline-none"
                type="password"
                name="confirmpassword"
                placeholder="Enter your password"
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
                required
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

            <input
              disabled={disable}
              className="w-full text-center text-xl text-white font-bold rounded-full  py-1 lg:py-2 bg-red-500 disabled:cursor-not-allowed transition-colors duration-700 hover:bg-green-500"
              type="submit"
              value="Register"
            />
          </form>
          <div className="text-center space-y-3 pb-10 md:pb-0">
            <p>
              Already registerd?
              <Link to="/login" className="ml-3 font-bold text-red-500">
                Click here
              </Link>
            </p>
            <p className="font-bold text-red-500">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
