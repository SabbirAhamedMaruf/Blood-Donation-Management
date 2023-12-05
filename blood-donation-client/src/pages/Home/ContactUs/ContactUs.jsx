import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);

  const handleFormSubmit =(e)=>{
    e.preventDefault();
  }

  return (
    <div data-aos="zoom-out" className="bg-red-500  flex flex-col-reverse md:flex-row justify-center items-center md:gap-8 lg:gap-96">
      <div className="p-10">
        <form onSubmit={handleFormSubmit} className="p-5 lg:p-2 rounded-md flex flex-col gap-3 lg:gap-5 bg-white">
          <h1 className="font-bold lg:text-2xl text-center ">
            Your Information
          </h1>
          <div className="flex flex-col md:flex-row gap-5">
            <input
              className="text-[12px] md:text-[15px] lg:w-[15vw] px-2 py-1 lg:py-2 bg-red-50 outline-none text-black font-semibold"
              type="text"
              name="name"
              placeholder="Enter Your Name"
            />
            <input
              className="text-[12px] md:text-[15px] lg:w-[15vw] px-2 py-1 lg:py-2 bg-red-50 outline-none text-black font-semibold"
              type="number"
              name="phone"
              placeholder="Enter Your Phone Number"
            />
          </div>
          <input
            className="text-[12px] md:text-[15px] px-2 py-1 lg:py-2 bg-red-50 outline-none text-black font-semibold"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <select
            className="text-[12px] md:text-[15px] px-2 py-2 bg-red-50 outline-none"
            name="bloodgroup"
          >
            <option value="none">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <textarea
            className="text-[12px] md:text-[15px] px-2 py-2 bg-red-50 outline-none text-black font-semibold"
            name="message"
            cols="30"
            rows="5"
            placeholder="Your message"
          ></textarea>
          <input className="text-center text-xl text-white font-bold rounded-full  py-1 lg:py-2 bg-black transition-colors duration-700 hover:bg-green-500" type="submit" value="Submit" />
        </form>
      </div>
      <div className="pt-5 md:pt-0 text-center md:text-left text-white space-y-3 lg:space-y-10">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
          Contact Us
        </h1>
        <h3 className="font-semibold text-[12px] md:text-[15px] lg:text-xl">
          +1 (555) 123-4567
        </h3>
        <h3 className="font-semibold text-[12px] md:text-[15px] lg:text-xl">
          lifeflow@gmail.com
        </h3>
      </div>
    </div>
  );
};

export default ContactUs;

// TODO : Take input from here and save inside admin dashboard (see requirment first)
