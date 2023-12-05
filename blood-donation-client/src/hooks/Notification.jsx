import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
export const NotificationContext = createContext(null);

const Notification = ({ children }) => {
  const handleSuccessToast = (message) => {
    toast.success(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleErrorToast = (message) => {
    toast.error(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };
  const NotificationContextValue = { handleSuccessToast, handleErrorToast };
  return (
    <NotificationContext.Provider value={NotificationContextValue}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};
Notification.propTypes = {
  children: PropTypes.node,
};

export default Notification;
