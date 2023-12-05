import { Navigate } from "react-router";
import PropTypes from "prop-types";
import { useContext } from "react";
import { SecurityContext } from "../Provider/SecurityProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(SecurityContext);

  if (loading) {
    return (
      <>
        <div className="grid justify-center items-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      </>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" replace></Navigate>;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoutes;

// TODO : Add a spinner on loading section
