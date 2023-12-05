import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../API/useAxiosPublic";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { SecurityContext } from "../../../Provider/SecurityProvider";
import useUserType from "../../../API/useUserType";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

const ManageContent = () => {
  const [userType] = useUserType();
  const { user } = useContext(SecurityContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [refetch, setRefetch] = useState(true);
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogType, setBlogType] = useState("draft");

  const handleChangeBlogType = (e) => {
    setBlogType(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);

  // changing blog status
  const handleChangeBlogStatus = async (blogId, status) => {
    await axiosSecure.patch(
      `/update-blog-status?email=${user.email}&blogId=${blogId}&status=${status}`
    );
    setRefetch(!refetch);
  };

  // changing blog status
  const handleChangeFeaturedStatus = async (blogId, status) => {
    await axiosSecure.patch(
      `/make-blog-featured?email=${user.email}&blogId=${blogId}&status=${status}`
    );
    setRefetch(!refetch);
  };

  // delete blog
  const handleDeleteBlog = async (blogId) => {
    await axiosSecure.delete(
      `/delete-current-blog?email=${user.email}&blogId=${blogId}`
    );
    setRefetch(!refetch);
  };

  useEffect(() => {
    axiosPublic
      .get(`/get-blog-data?blogType=${blogType}`)
      .then((res) => setAllBlogs(res.data.data));
  }, [axiosPublic, blogType, refetch]);

  return (
    <div className="w-[90%] lg:w-[90vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5">
            <Helmet>
        <title>Life Flow : Content Management</title>
      </Helmet>
      <div className="h-[5vh] flex justify-between items-center">
        <div>
          <label htmlFor="sortblog">Sort By</label>
          <select
            onChange={handleChangeBlogType}
            className="w-[10vw] ml-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none"
            name="sortblog"
          >
            <option value="draft">Draft</option>
            <option value="publish">Published</option>
          </select>
        </div>
        <div>
          <Link to="/dashboard/content-management/add-blog">
            <button className="px-4 py-2 bg-red-500 font-bold text-white rounded-full">
              Add Blog
            </button>
          </Link>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="ml-8 md:ml-0 lg:ml-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-y-16 my-10"
      >
        {allBlogs.map((i) => (
          <div
            key={i._id}
            className="card w-[320px] h-[470px] bg-base-100 shadow-xl"
          >
            <figure>
              <img src={i.photo} className="h-[250px] object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{i.title}</h2>
              <p>{i.content.replace(/<[^>]*>/g, "").slice(0, 30)}....</p>
              <div className="card-actions justify-center">
                {userType === "admin" && (
                  <>
                    {i.status === "draft" ? (
                      <button
                        onClick={() => handleChangeBlogStatus(i._id, "publish")}
                        className="px-2 py-1 bg-green-400 font-semibold text-white rounded-full"
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleChangeBlogStatus(i._id, "draft")}
                        className="px-2 py-1 bg-green-400 font-semibold text-white rounded-full"
                      >
                        Unpublish
                      </button>
                    )}
                  </>
                )}

                {userType === "admin" && (
                  <div>
                    <button
                      onClick={() => handleDeleteBlog(i._id)}
                      className="mr-1 px-2 py-1 bg-red-400 font-semibold text-white rounded-full"
                    >
                      Delete
                    </button>
                    <>
                      {i.featured === "Not featured" ? (
                        <button
                          onClick={() =>
                            handleChangeFeaturedStatus(i._id, "featured")
                          }
                          className="px-2 py-1 bg-blue-400 font-semibold text-white rounded-full"
                        >
                          Featured
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleChangeFeaturedStatus(i._id, "Not featured")
                          }
                          className="px-2 py-1 bg-red-400 font-semibold text-white rounded-full"
                        >
                          Not Featured
                        </button>
                      )}
                    </>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageContent;
