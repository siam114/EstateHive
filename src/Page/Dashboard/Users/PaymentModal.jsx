/* eslint-disable react/prop-types */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentModal = ({ property, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/5 space-y-5 mx-auto">
        <h3 className="text-xl font-semibold text-gray-900">
          Payment for {property?.property?.name}
        </h3>
        <p className="text-gray-600 mt-2">
          Offered Amount: ${property?.offer_amount}
        </p>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm onClose={onClose} property={property} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
