import { useEffect, useState } from "react";
import useAxiosPublic from "../../API/useAxiosPublic";
import { useParams } from "react-router-dom";
import { Markup } from "interweave";

const ViewBlogDetails = () => {
  const params = useParams();
  const [currentBlogData, setCurrentBlogData] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get(`/get-blog-data-public/${params.id}`)
      .then((res) => setCurrentBlogData(res.data.data));
  }, [axiosPublic, params.id, setCurrentBlogData]);

  return (
    <div>
      <div className="w-[90%] lg:h-[80vh] lg:w-[80vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5 flex flex-col lg:flex-row gap-10 md:gap-5 lg:gap-20 items-center">
        <div className="lg:w-1/2 lg:p-0">
          <img
            src={currentBlogData.photo}
            className="h-full w-full shadow-lg lg:shadow-xl rounded-lg"
          />
        </div>
        <div className="p-5 lg:p-0 lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
            {currentBlogData.title}
          </h1>
          <div className="flex items-center gap-2">
          <img src={currentBlogData.avatar} className="w-8" />
          <h1 className="text-[15px] md:text-[17px]  lg:text-xl font-bold p-1 lg:px-2 lg:py-1 text-white bg-red-500 rounded-full">{currentBlogData.name}</h1>
          </div>
          <p className="text-justify">
            <Markup content={currentBlogData?.content}></Markup>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBlogDetails;
