import { useEffect, useState } from "react";
import useAxiosPublic from "../../API/useAxiosPublic";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

const Blogs = () => {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);
  const [allBlogs, setAllBlogs] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get(`/get-blog-data-public`)
      .then((res) => setAllBlogs(res.data.data));
  }, [axiosPublic]);

  console.log(allBlogs);

  return (
    <div className="w-[90%] lg:w-[90vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl ">
      <Helmet>
        <title>Life Flow : Blogs</title>
      </Helmet>
      <div className="h-1/4 text-center text-xl md:text-2xl lg:text-2xl font-semibold mb-10">
        <h1 className="text-center font-semibold text-xl md:text-2xl lg:text-4xl ">
          Blogs
        </h1>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="ml-9 md:ml-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 my-10"
      >
        {allBlogs?.map((i) => (
          <div
            key={i._id}
            className="card w-[320px] h-[490px] bg-base-100 shadow-xl outline-4 outline-transparent hover:outline-red-500"
          >
            <figure>
              <img src={i.photo} className="h-[250px] object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{i.title}</h2>
              <p>{i.content.replace(/<[^>]*>/g, "").slice(0, 30)}....</p>
              <div className="card-actions items-center justify-between">
                <div className="flex items-center gap-2">
                  <FacebookShareButton
                    title={i.title}
                    url={`${import.meta.env.VITE_SOCIAL_SHARE_BASE_URL}/${
                      i._id
                    }`}
                    // qoute={"Share this blog wtih facebook"}
                    hashtag="#Blood Donation"
                  >
                    <FacebookIcon size="28px" round={true} />
                  </FacebookShareButton>

                  <WhatsappShareButton
                    title={i.title}
                    url={`${import.meta.env.VITE_SOCIAL_SHARE_BASE_URL}/${
                      i._id
                    }`}
                    // qoute={"Share this blog wtih facebook"}
                    hashtag="#Blood Donation"
                  >
                    <WhatsappIcon size="28px" round={true} />
                  </WhatsappShareButton>

                  <TwitterShareButton
                    title={i.title}
                    url={`${import.meta.env.VITE_SOCIAL_SHARE_BASE_URL}/${
                      i._id
                    }`}
                    // qoute={"Share this blog wtih facebook"}
                    hashtag="#Blood Donation"
                  >
                    <TwitterIcon size="28px" round={true} />
                  </TwitterShareButton>
                </div>
                <Link to={`/blogs/${i._id}`}>
                  <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-full transition-colors duration-700 hover:bg-green-500">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
