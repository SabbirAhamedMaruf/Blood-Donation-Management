import Banner from "./Banner/Banner";
import ContactUs from "./ContactUs/ContactUs";
import Footer from "../Shared/Footer";
import OurBestServices from "./OurBestServices/OurBestServices";
import UpcomingFeaturedCampaign from "./UpcomingCampaign/UpcomingFeaturedCampaign";
import Teams from "./Teams/Teams";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Life Flow</title>
      </Helmet>
      <Banner />
      <OurBestServices />
      <ContactUs />
      <div className="my-10">
        <h1 className="text-center font-semibold text-3xl">
          Featured Campaigns
        </h1>
        <UpcomingFeaturedCampaign />
      </div>
      <div>
        <h1 className="text-center font-semibold text-3xl">Team Members</h1>
        <Teams />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
