import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import SingleFeaturedData from "../../../Components/SingleFeaturedData";
import useAxiosPublic from "../../../API/useAxiosPublic";
import AOS from "aos";
import "aos/dist/aos.css";



const UpcomingFeaturedCampaign = () => {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);
  const [featuredBlogData, setFeaturedBlogData] = useState([]);
  const axiosPublic = useAxiosPublic();
  // Home page testimonial
  useEffect(() => {
    axiosPublic
      .get("/get-all-featured-blogs")
      .then((result) => setFeaturedBlogData(result.data.data));
  }, [axiosPublic]);


console.log("Featued",featuredBlogData)
  return (
    <div data-aos="zoom-out-down" className="w-full">
      <Marquee speed={100} pauseOnHover={true}>
        {featuredBlogData?.map((i) => (
          <SingleFeaturedData
            key={i._id}
            data={i}
          ></SingleFeaturedData>
        ))}
      </Marquee>
    </div>
  );
};

export default UpcomingFeaturedCampaign;

