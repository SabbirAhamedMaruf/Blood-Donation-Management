import { PiQuotesFill } from "react-icons/pi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SingleFeaturedData = ({ data }) => {
  return (
    <div className="flex justify-center items-center gap-5 shadow-xl rounded-xl p-5 bg-white  text-black  h-[24vh] lg:h-[35vh] w-[95vw] md:w-[60vw] lg:w-[30vw] mr-20 my-10">
      <figure className="flex-1">
        <img
          src={data.photo}
          className="w-36 h-36 md:h-36 md:w-36 lg:h-60 lg:w-60 rounded-xl object-cover "
        />
      </figure>
      <div className="flex-1  text-left">
        <h1 className="flex justify-end">
          <PiQuotesFill className="text-xl lg:text-4xl opacity-40" />
        </h1>
        <h2 className="card-title">{data.name}</h2>
        <p className="text-[13px] lg:text-[17px] md:text-normal">
          {data.title.replace(/<[^>]*>/g, "").slice(0, 100)}....
        </p>
        <Link to={`/blogs/${data._id}`}>
          <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-full transition-colors duration-700 hover:bg-green-500">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

SingleFeaturedData.propTypes = {
  data: PropTypes.object,
};

export default SingleFeaturedData;
