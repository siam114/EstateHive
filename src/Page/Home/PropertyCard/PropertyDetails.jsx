import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";
import { useContext, useState } from "react";
import ReviewModal from "../../../component/Modal/ReviewModal";
import { AuthContext } from "../../../context/AuthProvider";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const handleOpenModal = () => setShowReviewModal(true);
  const handleCloseModal = () => setShowReviewModal(false);

  const handleSubmitReview = async (review) => {
    try {
      console.log("Submitted Review:", review);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-review`,
        { user_id: user._id, property_id: id, review }
      );

      if (res.data.success) {
        console.log("Review added successfully:", res.data);
      } else {
        console.error("Failed to add review:", res.data.message);
      }
      refetch()
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting review:", error.message);
    }
  };

  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/properties/${id}`
      );
      return data;
    },
  });

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/reviews/${id}`
      );
      return data;
    },
  });

  const {
    name,
    min_price,
    max_price,
    location,
    description,
    image,
    agent,
    verified,
  } = property;

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Property Details */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Property Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={image}
            alt={name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right: Property Information */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-gray-600 mb-2">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Price Range:</strong> ${min_price} - ${max_price}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Agent:</strong> {agent?.name}{" "}
            <span
              className={`ml-2 text-sm px-2 py-1 rounded ${
                verified
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {verified ? "Verified" : "Unverified"}
            </span>
          </p>
          <p className="text-gray-600 mb-6">{description}</p>

          {/* Add to Wishlist Button */}
          <button
            onClick={() => addToWishlist(property)}
            className="bg-[#363e94] text-white px-4 py-2 rounded-md shadow hover:bg-[#363e94cb]"
          >
            Add to Wishlist
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {/* Add Review Button */}
          <button
          onClick={handleOpenModal}
          className="mb-4 bg-[#363e94] text-white px-4 py-2 rounded-md shadow hover:bg-[#363e94cb]"
        >
          Add a Review
        </button>

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="mb-4 p-4 border rounded-lg shadow"
              >
                <h4 className="font-bold">{review.user.name}</h4>
                <p>{review.review}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p>No reviews found for this property.</p>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
      />
    </div>
  );

  function addToWishlist(property) {
    // Add property to the wishlist and save to database
    console.log("Added to wishlist:", property);
  }
};

export default PropertyDetails;
