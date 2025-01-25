import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../Loading";

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();
  const fetchReviews = async () => {
    const res = await axiosSecure.get("/reviews"); 
    return res.data;
  };

  // Fetch all reviews using useQuery
  const { data: reviews = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  // Handle review delete
  const handleDelete = async (reviewId) => {
    try {
      const res = await axiosSecure.delete(`/delete-review/${reviewId}`); 
      if (res.data.success) {
        toast.success("Review deleted successfully!");
        refetch(); 
      } else {
        toast.error("Failed to delete the review.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("An error occurred while deleting the review.");
    }
  };

  // Handle loading and error states
  if (isLoading) return <Loading/>
  if (isError) return <p>Failed to fetch reviews. Please try again.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 bg-white shadow-lg rounded-lg flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={review.user.image}
                alt={review.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{review.user.name}</p>
                <p className="text-sm text-gray-500">{review.user._id}</p>
              </div>
            </div>
            <p className="mt-2 text-gray-700">{review.review}</p>
            <p className="text-xs text-gray-400">Property: {review.property.name}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
