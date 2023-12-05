import { useEffect, useState } from "react";
import useAxiosPublic from "../../API/useAxiosPublic";
import SingleDonationRequestPageData from "../../Components/SingleDonationRequestPageData";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";


const DonationRequest = () => {
  const [pendingDonationRequest, setPendingDonationRequest] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);

  useEffect(() => {
    axiosPublic
      .get("/donationRequest")
      .then((res) => setPendingDonationRequest(res.data.data));
  }, [axiosPublic]);

  console.log(pendingDonationRequest);
  return (
    <div>
      <Helmet>
        <title>Life Flow : Donation Request</title>
      </Helmet>
      <div className="w-[90%] h-[100vh] lg:h-[80vh] lg:w-[90vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl ">
        <div>
          <h1 className="text-center font-semibold text-xl md:text-2xl lg:text-4xl ">
            Blood donation request
          </h1>
          {pendingDonationRequest.length === 0 ? (
            <h1 className="text-xl md:text-2xl lg:text-3xl text-red-500 font-semibold text-center mt-60">
              No donation requests found
            </h1>
          ) : (
            <div data-aos="fade-up" data-aos-duration="1500" className="h-3/4 w-full py-5">
              <div className="overflow-x-auto ">
                <table className="table table-lg space-y-5">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Requester Name</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingDonationRequest.map((i, idx) => (
                      <SingleDonationRequestPageData
                        key={i._id}
                        number={idx}
                        data={i}
                      ></SingleDonationRequestPageData>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>No.</th>
                      <th>Requester Name</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>View</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationRequest;
