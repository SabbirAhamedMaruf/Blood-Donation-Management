import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../../hooks/Notification";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { SecurityContext } from "../../../Provider/SecurityProvider";
import PropTypes from "prop-types";

const CheckoutForm = ({ handleRefetch, setHandleRefetch }) => {
  const { user } = useContext(SecurityContext);
  const axiosSecure = useAxiosSecure();
  const { handleSuccessToast, handleErrorToast } =
    useContext(NotificationContext);
  // data must greater than 0 to get client secret
  const [amount, setAmount] = useState(1);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);

  const handlePriceChange = (e) => {
    setAmount(parseInt(e.target.value));
  };

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: amount })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [axiosSecure, amount]);

  // Payment submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    // Handling payment error
    if (error) {
      handleErrorToast("Payment Error :", error.message);
    } else {
      console.log(paymentMethod);
      handleSuccessToast("Payment successfully completed!");
    }

    // confirm payment
    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      }
    );

    // handling payment confirmation
    if (confirmError) {
      handleErrorToast("Confirm Error");
    } else {
      {
        if (paymentIntent.status === "succeeded") {
          handleSuccessToast(
            `Transaction Id : ${paymentIntent.id}, Amount : ${
              paymentIntent.amount / 100
            }`
          );

          // saving payment inside database
          const paymentInfo = {
            name: user?.displayName,
            email: user?.email,
            amount: paymentIntent.amount / 100,
            Date: new Date(),
            transactionId: paymentIntent.id,
          };

          // payment entry api
          axiosSecure
            .post(`/add-my-payment?email=${user.email}`, paymentInfo)
            .then(() => {
              setHandleRefetch(!handleRefetch);
            });
        }
      }
    }
    form.reset();
  };

  return (
    <div className="lg:p-20">
      <h1 className="text-2xl mb-5 text-gray-500">Payment Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-[80vw] md:w-[50vw] lg:w-full ">
          <CardElement
            className="w-full shadow-md lg:shadow-lg rounded-xl p-10 "
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <div>
          <div className="mt-5 space-x-5">
            <label
              className="text-[15px] lg:text-xl font-semibold"
              htmlFor="email"
            >
              Amount
            </label>
            <input
              onChange={handlePriceChange}
              className="lg:w-[10vw] px-2 py-2 bg-red-50 outline-none"
              type="number"
              name="amount"
              placeholder="Enter your amount ($)"
              required
              min={1}
            />
          </div>
        </div>
        <button
          className="px-6 py-2 font-semibold uppercase rounded-md mt-10 text-white bg-green-300 my-4 disabled:cursor-not-allowed"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  handleRefetch: PropTypes.bool,
  setHandleRefetch: PropTypes.func,
};

export default CheckoutForm;
