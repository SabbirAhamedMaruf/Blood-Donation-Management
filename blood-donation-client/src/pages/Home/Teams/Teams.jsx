import doc1 from "../../../assets/doc1.jpg";
import doc2 from "../../../assets/doc2.jpg";
import doc3 from "../../../assets/doc3.jpg";
import doc4 from "../../../assets/doc4.jpg";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagramSquare, FaTwitter } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Teams = () => {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);
  return (
    <div data-aos="fade-up" className="md:mr-14 lg:mr-[14%]  w-[70vw] md:w-[80vw] lg:w-[70vw] m-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:flex flex-row gap-y-10 lg:gap-5">
      <div className="card card-compact md:w-72 lg:w-96 bg-base-100 shadow-xl space-y-5">
        <figure className="relative">
          <img src={doc1} alt="Shoes" />
          <div className="absolute bg-black w-full h-full opacity-0 transition-all duration-700 hover:opacity-20">
            Hi
          </div>
        </figure>
        <div className="relative text-center font-semibold pb-8">
          <h2 className="text-2xl ">Dr. Benjamin Mitchell</h2>
          <p className="text-xl">Co-Founder</p>
          <div className="absolute -bottom-3 left-[30%] flex justify-center gap-5 text-xl ">
            <FaFacebookF className="text-black p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
            <FaTwitter className="p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
            <FaInstagramSquare className="p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
          </div>
        </div>
      </div>
      <div  className="card card-compact md:w-72 lg:w-96 bg-base-100 shadow-xl space-y-5">
        <figure className="relative">
          <img src={doc2} alt="Shoes" />
          <div className="absolute bg-black w-full h-full opacity-0 transition-all duration-700 hover:opacity-20">
            Hi
          </div>
        </figure>
        <div className="relative text-center font-semibold pb-8">
          <h2 className="text-2xl ">Dr. Benjamin Mitchell</h2>
          <p className="text-xl">Co-Founder</p>
          <div className="absolute -bottom-3 left-[30%] flex justify-center gap-5 text-xl ">
            <FaFacebookF className="text-black p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
            <FaTwitter className="p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
            <FaInstagramSquare className="p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
          </div>
        </div>
      </div>
      <div  className="card card-compact md:w-72 lg:w-96 bg-base-100 shadow-xl space-y-5">
        <figure className="relative">
          <img src={doc3} alt="Shoes" />
          <div className="absolute bg-black w-full h-full opacity-0 transition-all duration-700 hover:opacity-20">
            Hi
          </div>
        </figure>
        <div className="relative text-center font-semibold pb-8">
          <h2 className="text-2xl ">Dr. Benjamin Mitchell</h2>
          <p className="text-xl">Co-Founder</p>
          <div className="absolute -bottom-3 left-[30%] flex justify-center gap-5 text-xl ">
            <FaFacebookF className="text-black p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
            <FaTwitter className="p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
            <FaInstagramSquare className="p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
          </div>
        </div>
      </div>
      <div  className="card card-compact md:w-72 lg:w-96 bg-base-100 shadow-xl space-y-5">
        <figure className="relative">
          <img src={doc4} alt="Shoes" />
          <div className="absolute bg-black w-full h-full opacity-0 transition-all duration-700 hover:opacity-20">
            Hi
          </div>
        </figure>
        <div className="relative text-center font-semibold pb-8">
          <h2 className="text-2xl ">Dr. Benjamin Mitchell</h2>
          <p className="text-xl">Co-Founder</p>
          <div className="absolute -bottom-3 left-[30%] flex justify-center gap-5 text-xl ">
            <FaFacebookF className="text-black p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
            <FaTwitter className="p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
            <FaInstagramSquare className="p-1 lg:p-2 text-2xl lg:text-4xl bg-red-400 rounded hover:bg-black hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
