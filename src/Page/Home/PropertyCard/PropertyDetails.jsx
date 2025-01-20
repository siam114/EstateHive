import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";
import { useState } from "react";

const PropertyDetails = () => {
  const { id } = useParams();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/properties/${id}`);
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
          <img src={image} alt={name} className="w-full h-auto rounded-lg shadow-md" />
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
            <span className={`ml-2 text-sm px-2 py-1 rounded ${verified ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
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
        <div className="space-y-4">
          {property.reviews?.length > 0 ? (
            property.reviews.map((review) => (
              <div key={review.id} className="bg-gray-100 p-4 rounded-md shadow">
                <p>
                  <strong>{review.user}</strong>: {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>

        {/* Add Review Button */}
        <button
          onClick={() => setShowReviewModal(true)}
          className="mt-4 bg-[#363e94] text-white px-4 py-2 rounded-md shadow hover:bg-[#363e94cb]"
        >
          Add a Review
        </button>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Add a Review</h3>
            <textarea
              className="w-full border rounded-md p-2 mb-4"
              rows="4"
              placeholder="Write your review here..."
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => submitReview()}
                className="px-4 py-2 rounded-md bg-[#363e94] text-white hover:bg-[#363e94cb]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function addToWishlist(property) {
    // Add property to the wishlist and save to database
    console.log("Added to wishlist:", property);
  }

  function submitReview() {
    // Submit the review to the database
    console.log("Review submitted");
    setShowReviewModal(false);
  }
};

export default PropertyDetails;
