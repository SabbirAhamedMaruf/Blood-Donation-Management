import funding from "../../../assets/funding.jpg";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { SecurityContext } from "../../../Provider/SecurityProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
// stripe key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
const DonorFundForOrganization = () => {
  const [paymentData, setPaymentData] = useState([]);
  const { user } = useContext(SecurityContext);
  const axiosSecure = useAxiosSecure();
  const [handleRefetch, setHandleRefetch] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);
  // getting user payments
  useEffect(() => {
    axiosSecure
      .get(`/get-all-user-payments?email=${user.email}`)
      .then((res) => setPaymentData(res.data.data));
  }, [axiosSecure, user.email, handleRefetch]);

  console.log(paymentData);

  return (
    <div>
      <Helmet>
        <title>Life Flow : Funding</title>
      </Helmet>
      <div className="w-[90%] lg:w-[80vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5  flex flex-col lg:flex-row gap-10 md:gap-5 lg:gap-20 items-center">
        <div className="lg:w-1/2 p-5 lg:p-0">
          <img src={funding} className="shadow-lg lg:shadow-xl rounded-lg" />
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1500"
          className="md:w-1/2 space-y-5"
        >
          <h1 className="text-center font-bold text-xl lg:text-4xl">Funding</h1>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                handleRefetch={handleRefetch}
                setHandleRefetch={setHandleRefetch}
              />
            </Elements>
          </div>
        </div>
      </div>
      <div className="text-center w-[90%] lg:w-[80vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl my-5">
        {/* showing payment data */}
        <h1 className="font-bold text-3xl">Your Payments</h1>

        <div>
          {paymentData.length === 0 ? (
            <h1 className="text-xl md:text-2xl lg:text-3xl text-red-500 font-semibold text-center my-20">
              Not payments found
            </h1>
          ) : (
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="w-[70vw] m-auto py-5"
            >
              <div className="overflow-x-auto ">
                <table className="table table-lg space-y-5">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentData.map((i, idx) => (
                      <tr key={i._id}>
                        <th>{idx + 1}</th>
                        <td>{i.name}</td>
                        <td>{i.email}</td>
                        <td>{i.amount}</td>
                        <td>{i.Date.split("T")}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Amount</th>
                      <th>Date</th>
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

export default DonorFundForOrganization;

// TODO : Loop throught and show payment data
