import banner from "../../../assets/banner.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";



const Banner = () => {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);
  return (
    // dark:bg-[#212538]
    <div data-aos="fade-up" className="w-[90vw] m-auto shadow-lg md:p-5 lg:p-10 rounded-lg lg:rounded-2xl mb-10 ">
      <div className="hidden md:flex">
        {/* Slider */}
        <div className="w-1/2 flex flex-col justify-around">
          <div className="h-[60%] text-left">
            <Carousel
              axis="vertical"
              showArrows={false}
              showIndicators={false}
              showStatus={false}
              swipeable={true}
              stopOnHover={true}
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
            >
              <div className="h-[40vh] flex flex-col justify-center items-center space-y-5">
                <h1 className="w-52 lg:w-96 md:text-3xl lg:text-7xl font-bold text-red-500">
                  Simple Act, Big Impact
                </h1>
                <p className="lg:text-xl w-[60%] font-semibold text-gray-400 opacity-60">
                  One donation can touch multiple lives and create a ripple of
                  positivity.
                </p>
              </div>
              <div className="h-[40vh] flex flex-col justify-center items-center space-y-5">
                <h1 className="w-52 lg:w-96 md:text-3xl lg:text-7xl font-bold text-red-500">
                  Saving Lives
                </h1>
                <p className="lg:text-xl w-[60%] font-semibold opacity-60">
                  Donate blood and be a hero. Your contribution can save lives
                  and make a difference.
                </p>
              </div>
              <div className="h-[40vh] flex flex-col justify-center items-center space-y-5">
                <h1 className="w-52 lg:w-96 md:text-3xl lg:text-7xl font-bold text-red-500">
                  Gift of Life
                </h1>
                <p className="lg:text-xl w-[60%] font-semibold opacity-60">
                  {
                    "Be a donor and share the joy of making a positive impact on someone's health."
                  }
                </p>
              </div>
              <div className="h-[40vh] flex flex-col justify-center items-center space-y-5">
                <h1 className="w-52 lg:w-96 md:text-3xl lg:text-7xl font-bold text-red-500">
                  Community Support
                </h1>
                <p className="lg:text-xl w-[60%] font-semibold opacity-60">
                  Join hands in this life-saving mission and strengthen the
                  bonds of compassion.
                </p>
              </div>
              <div className="h-[40vh] flex flex-col justify-center items-center space-y-5">
                <h1 className="w-52 lg:w-[500px] md:text-3xl lg:text-7xl font-bold text-red-500">
                  Every Drop Counts
                </h1>
                <p className="lg:text-xl w-[60%] font-semibold opacity-60">
                  {
                    "Your contribution, no matter how small, can play a crucial role."
                  }
                </p>
              </div>
            </Carousel>
          </div>

          <div className="flex justify-center gap-2 lg:gap-10 z-10">
            <Link to="/register">
              <button className="md:px-2 md:py-1 lg:px-6 lg:py-2 bg-red-500 text-white rounded-full lg:text-[18px] transition-colors duration-700 hover:bg-green-500">
                Join as donor
              </button>
            </Link>
            <Link to="/search-donors">
              <button className="md:px-2 md:py-1 lg:px-6 lg:py-2 bg-black text-white rounded-full lg:text-[18px] transition-colors duration-700 hover:bg-green-500">
                Search Donors
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-center gap-5 text-xl lg:text-2xl">
            <h1 className="font-bold">Follow us</h1>
            <FaFacebookF className="p-1 lg:p-2 text-white lg:text-4xl bg-red-500 rounded-full hover:bg-white hover:text-red-500" />
            <LuInstagram className="p-1 lg:p-2 text-white lg:text-4xl bg-red-500 rounded-full hover:bg-white hover:text-red-500" />
            <FaTwitter className="p-1 lg:p-2 text-white lg:text-4xl bg-red-500 rounded-full hover:bg-white hover:text-red-500" />
          </div>
        </div>
        {/* Image */}
        <div className="w-1/2">
          <img src={banner} className="md:pt-16 lg:pt-0 rounded-xl" />
        </div>
      </div>

      <div className="relative md:hidden">
        <div className="flex items-center p-8">
          <div className="text-center px-5">
            <h1 className="font-bold text-red-500 text-xl">
              Simple Act, Big Impact
            </h1>
            <p className="text-[12px]">
              One donation can touch multiple lives and create a ripple of
              positivity.
            </p>
          </div>
          <img src={banner} className="w-1/2" />
        </div>
        <div className="absolute -bottom-4 left-[20%] flex justify-center gap-2 lg:gap-10">
          <Link to="/register">
            <button className="p-1 rounded-sm bg-red-500 text-white">
              Join as donor
            </button>
          </Link>
          <Link to="/search-donors">
            <button className="p-1 rounded-sm bg-black text-white ">
              Search Donors
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

// TODO : Clicking on the “Join as a donor” button will redirect the user to registration page and Clicking on the “Search Donors” button will redirect the user to search page
