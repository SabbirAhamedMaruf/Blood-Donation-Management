import img1 from "../../../assets/bloodDonation.jpeg";
import img2 from "../../../assets/healthCheck.jpg";
import img3 from "../../../assets/lab.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


const OurBestServices = () => {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);
  return (
    <div>
      <h1 className="text-center  text-xl md:text-3xl font-bold">
        Our Best Services
      </h1>
      <div className="w-[60vw] m-auto space-y-10 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div data-aos="fade-right" className="lg:w-1/2">
            <img
              src={img1}
              className="lg:w-[70vw] lg:h-[400px]  object-cover rounded-xl"
            />
          </div>
          <div data-aos="fade-left" className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-gray-300">
              01
            </h1>
            <h1 className="text-xl md:text-2xl lg:text-5xl font-semibold">
              Blood Donation
            </h1>
            <p>
              {
                "Empowering communities with a vital lifeline. Our blood donation service strives to save lives through generosity, compassion, and collective impact."
              }
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          <div data-aos="fade-right" className="lg:w-1/2 text-center lg:text-end">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-gray-300">
              02
            </h1>
            <h1 className="text-xl md:text-2xl lg:text-5xl font-semibold">
              Health Check
            </h1>
            <p>
              {
                "Prioritize well-being with regular health checks. Early detection, prevention, and a proactive approach ensure a healthier, happier future for all."
              }
            </p>
          </div>
          <div data-aos="fade-left" className="lg:w-1/2">
            <img
              src={img2}
              className="lg:w-[50vw] lg:h-[400px] object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div data-aos="fade-right" className="lg:w-1/2">
            <img
              src={img3}
              className="lg:w-[50vw] lg:h-[400px] object-cover rounded-xl"
            />
          </div>
          <div data-aos="fade-left" className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-gray-300">
              03
            </h1>
            <h1 className="text-xl md:text-2xl lg:text-5xl font-semibold">
              Blood Bank
            </h1>
            <p>
              {
                "Blood banks: the heart of compassion. Saving lives by collecting, storing, and distributing life-saving blood. Be a donor, be a hero."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBestServices;
