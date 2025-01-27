/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useAuth } from "./../../../hook/useAuth";
import isSuccessful from "./../../../helper/status";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const CheckoutForm = ({ onClose, property }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const totalPrice = property?.offer_amount;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    //confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        try {
          const result = await axiosSecure.patch("/payment", {
            transection_id: paymentIntent.id,
            property_id: property.property._id,
            offer_id: property._id,
          });
          if (isSuccessful(result.status)) {
            setTransactionId(paymentIntent.id);
            await queryClient.resetQueries({
              queryKey: ["offered-properties"],
              exact: false,
            });
            toast.success("Payment Successfull");
            onClose()
          }
        } catch (error) {
          console.log(
            "transaction id",
            paymentIntent.id,
            error.response.data.status
          );
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
       {!transactionId &&  <CardElement
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
        />}
        {!transactionId && (
          <button
            disabled={!stripe || !clientSecret}
            className="w-full bg-green-500 text-white mt-5 py-2 rounded-full hover:bg-green-600"
            type="submit"
          >
            Pay Now
          </button>
        )}
        <button
          onClick={onClose}
          className="mt-2 w-full bg-gray-500 text-white py-2 rounded-full hover:bg-gray-600"
        >
          Cancel
        </button>
        <p className="text-red-600 pt-5">{error}</p>
        {transactionId && (
          <p className="text-gray-600 font-medium pt-5">
            Your transaction id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
