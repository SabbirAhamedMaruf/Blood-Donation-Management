import PropTypes from "prop-types";
const SingleUserData = ({
  number,
  data,
  handleUpdateUserStatus,
  handleUpdateUserRole,
}) => {
  return (
    <tr>
      <td>{number + 1}</td>
      <td>
        <img src={data.photo} className="w-16 rounded-full" />
      </td>
      <td>{data.email}</td>
      <td>{data.name}</td>
      <td>
        {data.status === "active" ? (
          <>
            <span className="px-3 py-1 bg-green-500 text-white rounded-full">
              {data.status}
            </span>
          </>
        ) : data.status === "blocked" ? (
          <>
            <span className="px-3 py-1 bg-red-500 text-white rounded-full">
              {data.status}
            </span>
          </>
        ) : (
          <></>
        )}
      </td>
      <td>{data.userType}</td>

      <td>
        {data.status === "active" ? (
          <button
            onClick={() => handleUpdateUserStatus(data._id, "blocked")}
            className="px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            Blocked
          </button>
        ) : (
          <button
            onClick={() => handleUpdateUserStatus(data._id, "active")}
            className="px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            active
          </button>
        )}
      </td>

      <td>
        {data.userType === "donor" ? (
          <button
            onClick={() => handleUpdateUserRole(data._id, "volunteer")}
            className="px-2 py-1 bg-orange-500 text-white rounded-md"
          >
            Volunteer
          </button>
        ) : data.userType === "volunteer" ? (
          <button
            onClick={() => handleUpdateUserRole(data._id, "donor")}
            className="px-2 py-1 bg-orange-500 text-white rounded-md"
          >
            Donor
          </button>
        ) : (
          <></>
        )}
      </td>
      <td>
        {data.userType === "donor" ? (
          <button
            onClick={() => handleUpdateUserRole(data._id, "admin")}
            className="px-2 py-1 bg-orange-500 text-white rounded-md"
          >
            Admin
          </button>
        ) : data.userType === "volunteer" ? (
          <button
            onClick={() => handleUpdateUserRole(data._id, "admin")}
            className="px-2 py-1 bg-orange-500 text-white rounded-md"
          >
            Admin
          </button>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};
SingleUserData.propTypes = {
  number: PropTypes.number,
  data: PropTypes.object,
  handleUpdateUserStatus: PropTypes.func,
  handleUpdateUserRole: PropTypes.func,
};

export default SingleUserData;
