import { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import isSuccessful from "../../../helper/status";

const MakeOffer = () => {
  const params = useParams();
  const [offerAmount, setOfferAmount] = useState("");
  const [setError] = useState("");
  const navigate = useNavigate()

  const axiosSecure = useAxiosSecure();

  // Fetch reviews using useQuery
  const {
    data: property = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist", { id: params.id }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${params.id}`);
      return res.data;
    },
    retry: false,
  });

  if (isLoading) return <Loading />;
  if (!property) return <p>No data available!</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const minPrice = property.min_price;
    const maxPrice = property.max_price;

    if (offerAmount < minPrice || offerAmount > maxPrice) {
      setError(
        `Offer amount must be between $${minPrice} and $${maxPrice}. Please try again.`
      );
      return;
    }

    try {
      const res = await axiosSecure.post(`/bid-property`, {
        agent_id: property?.agent?._id,
        property_id: property?.property?._id,
        offer_amount: Number(offerAmount),
      });
      if (isSuccessful(res.status)) {
        toast.success("Offer has been submitted");
        navigate('/dashboard/propertyBought')
      } else {
        toast.error("Offer failed to submit");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting the item.");
    }
    setError("");
    alert("Offer submitted successfully!");
  };

  return (
    <div className="make-offer-form-container p-6">
      <h2 className="text-3xl font-bold mb-4">Make an Offer</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium">Property Title</label>
          <input
            type="text"
            value={property?.property?.name}
            disabled
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Property Location</label>
          <input
            type="text"
            value={property?.property?.location}
            disabled
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Agent Name</label>
          <input
            type="text"
            value={property?.agent?.name}
            disabled
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Offer Amount</label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Buyer Email</label>
          <input
            type="text"
            value={property?.user?.email}
            disabled
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Buyer Name</label>
          <input
            type="text"
            value={property?.user?.name}
            disabled
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Buying Date</label>
          <input type="date" className="w-full border rounded-lg p-2" />
        </div>
        {error && <p className="md:col-span-2 text-red-500">{error}</p>}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Submit Offer
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeOffer;
