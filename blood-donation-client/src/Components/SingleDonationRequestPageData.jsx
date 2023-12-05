import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SingleDonationRequestPageData = ({ data, number }) => {
  return (
    <tr>
      <th>{number + 1}</th>
      <td>{data.requestername}</td>
      <td>
        District : {data.recipientdistrict}, Upazila : {data.recipientupazila}
      </td>
      <td>{data.donationdate}</td>
      <td>{data.donationtime}</td>
      <td>
        <Link to={`/dashboard/view-donation-details/${data._id}`}>
          <button className="px-2 p-1 bg-green-500 text-white rounded-md">
            View Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

SingleDonationRequestPageData.propTypes = {
  data: PropTypes.object,
  number: PropTypes.int,
};

export default SingleDonationRequestPageData;
