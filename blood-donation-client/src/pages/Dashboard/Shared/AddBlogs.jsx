import JoditEditor from "jodit-react";
import { useContext, useRef, useState } from "react";
import useAxiosSecure from "../../../API/useAxiosSecure";
import axios from "axios";
import { SecurityContext } from "../../../Provider/SecurityProvider";
import { NotificationContext } from "../../../hooks/Notification";
import useUserData from "../../../API/useUserData";

const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGEBB_API
}`;

const AddBlogs = () => {
  const { handleSuccessToast, handleErrorToast } =
    useContext(NotificationContext);
  const { user } = useContext(SecurityContext);
  const axiosSecure = useAxiosSecure();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [, userData] = useUserData();

  const handleAddBlogPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const currentTitle = form.title.value;
    const currentContent = content;

    // getting image data
    const formData = new FormData();
    formData.append("image", form.photo.files[0]);

    // getting image link
    const response = await axios.post(imageHostingAPI, formData);

    const blogData = {
      title: currentTitle,
      photo: response.data.data.display_url,
      name: userData.name,
      email: userData.email,
      avatar: userData.photo,
      content: currentContent,
      status: "draft",
      featured: "Not featured",
    };

    await axiosSecure
      .post(`/add-my-blog?email=${user.email}`, blogData)
      .then((res) => {
        if (res.data.success) {
          handleSuccessToast("Blog content added successfully!");
          form.reset();
        } else {
          handleErrorToast("An error occured during connection!");
        }
      });
  };

  return (
    <div className="w-[90%] h-[100vh] lg:h-[80vh] lg:w-[90vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5">
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl font-semibold mb-10">
        Add new blog post
      </h1>
      <div>
        <form onSubmit={handleAddBlogPost} className="space-y-5">
          <div className="space-y-5">
            <label
              className=" text-[15px] lg:text-xl font-semibold"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              className="outline-none w-full py-2 px-2 col-span-2 md:col-span-3 lg:col-span-5   border-none bg-red-50"
              name="title"
              placeholder="Enter blog titile here"
              required
            />
          </div>
          <div className="space-y-5">
            <label
              className="text-[15px] lg:text-xl font-semibold"
              htmlFor="photo"
            >
              Photo
            </label>
            <input
              type="file"
              className="w-full py-2 px-2 border-none bg-red-50"
              name="photo"
              accept=".png, .jpg, .jpeg"
              required
            />
          </div>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => setContent(newContent)}
          />
          <input
            className="px-4 text-center text-xl text-white font-bold rounded-full  py-1 lg:py-2 bg-red-500"
            type="submit"
            value="Create"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
