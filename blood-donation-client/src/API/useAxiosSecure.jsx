import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SecurityContext } from "../Provider/SecurityProvider";

const axiosSecure = axios.create({
  baseURL: "https://blood-donation-server-fawn.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleSignOut } = useContext(SecurityContext);

  axiosSecure.interceptors.request.use(
    function (config) {
      // getting token
      const token = localStorage.getItem("token");

      config.headers.authorization = token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await handleSignOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
