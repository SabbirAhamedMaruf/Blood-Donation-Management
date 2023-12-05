import logo from "../../assets/logo.png";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-around  p-5 md:p-14 lg:p-20 bg-black  text-white space-y-5 md:space-y-0">
      <aside>
        <img src={logo} className="w-20 lg:w-24 m-auto" />
        <p className="text-2xl lg:text-3xl font-bold py-2 text-center">
          Life Flow
        </p>
        <p className="flex justify-center gap-5 text-xl ">
          <FaFacebookF className="p-1 lg:p-2 text-white lg:text-4xl bg-red-500 rounded-full hover:bg-white hover:text-red-500" />
          <LuInstagram className="p-1 lg:p-2 text-white lg:text-4xl bg-red-500 rounded-full hover:bg-white hover:text-red-500" />
          <FaTwitter className="p-1 lg:p-2 text-white lg:text-4xl bg-red-500 rounded-full hover:bg-white hover:text-red-500" />
        </p>
      </aside>
      <nav className="text-[14px] md:text-[15px]  lg:text-xl text-center">
        <header className="footer-title">Quick Links</header>
        <div className="flex flex-row md:flex-col justify-center gap-2">
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            Campaigns
          </a>
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            About Us
          </a>
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            Latest News
          </a>
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            Contact
          </a>
        </div>
      </nav>
      <nav className="text-[14px] md:text-[15px] lg:text-xl text-center">
        <header className="footer-title">Our Services</header>
        <div className="flex flex-row md:flex-col justify-center gap-2">
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            Blood Donation
          </a>
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            Blood Bank
          </a>
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            Donate Process
          </a>
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hidden md:block hover:text-red-500">
            Blood Info
          </a>
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hidden md:block hover:text-red-500">
            Health Check
          </a>
        </div>
      </nav>
      <nav className="text-[14px] md:text-[15px]  lg:text-xl  text-center">
        <header className="footer-title">Helpline</header>
        <div className="flex flex-col justify-center gap-2">
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            Phone : +1 (555) 123-4567
          </a>
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            Email : lifeflow@gmail.com
          </a>
          <a className="text-[12px] md:text-[15px] lg:text-[18px] hover:text-red-500">
            Address : Dhaka,Bangladesh
          </a>
          <p className="text-[12px] md:text-[15px] lg:text-[18px]  hover:text-red-500">
            Gulshan 56 West Avenue
          </p>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
