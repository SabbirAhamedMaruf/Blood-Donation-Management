import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login.png";
import { useContext } from "react";
import { SecurityContext } from "../../Provider/SecurityProvider";
import { NotificationContext } from "../../hooks/Notification";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  const { handleSuccessToast, handleErrorToast } =
    useContext(NotificationContext);
  const { loginWithEmailAndPassword } = useContext(SecurityContext);


  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);
  // Login with email and password
  const handleLoginWithEmailAndPassword = (e) => {
    e.preventDefault();
    const form = e.target;
    const currentEmail = form.email.value;
    const currentPassword = form.password.value;
    loginWithEmailAndPassword(currentEmail, currentPassword)
      .then(() => {
        handleSuccessToast("User logged in successfully!");
        navigate("/");
      })
      .catch((error) => {
        handleErrorToast("An error occured!", error.message);
      });
  };

  return (
    <div>
         <Helmet>
        <title>Life Flow : Login</title>
      </Helmet>
      <div className="w-[90%] lg:w-[80vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5  flex flex-col lg:flex-row gap-10 md:gap-5 lg:gap-20 items-center">
        <div className="lg:w-1/2 p-5 lg:p-0">
          <img src={login} className="shadow-lg lg:shadow-xl rounded-lg" />
        </div>
        <div data-aos="fade-left" data-aos-duration="1500" className="md:w-1/2 space-y-5">
          <h1 className="text-center font-bold text-xl lg:text-4xl">Login</h1>
          <form
            onSubmit={handleLoginWithEmailAndPassword}
            className="flex flex-col space-y-5 lg:space-y-10"
          >
            <div className="flex items-center gap-4 md:grid grid-cols-5 lg:grid-cols-7">
              <label
                className="text-[15px] lg:text-xl font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="ml-6 col-span-4 lg:col-span-6 px-2 py-2 bg-red-50 outline-none"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex items-center gap-4 md:grid grid-cols-4 lg:grid-cols-7">
              <label
                className="text-[15px] lg:text-xl font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="md:ml-2 lg:ml-5 col-span-3 lg:col-span-6 px-2 py-2 bg-red-50 outline-none"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>

            <input
              className="text-center text-xl text-white font-bold rounded-full  py-1 lg:py-2 bg-red-500 transition-colors duration-700 hover:bg-green-500"
              type="submit"
              value="Submit"
            />
          </form>

          <div className="text-center space-y-10 pb-10 md:pb-0">
            <p>
              Not registerd?
              <Link to="/register" className="ml-3 font-bold text-red-500">
                Click here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
