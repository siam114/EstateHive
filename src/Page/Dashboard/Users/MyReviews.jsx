import { useAuth } from "./../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Loading";
import isSuccessful from "../../../helper/status";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch reviews using useQuery
  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["myReviews", user?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-reviews/${user?._id}`
      ); 
      return res.data;
    },
  });

  // Function to handle delete
  const handleDelete = async (id) => {
    Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes. Delete it!"
        }).then((result) => {
         if(result.isConfirmed) {
           axiosSecure.delete(`/delete-review/${id}`)
           .then((res) => {
             if(isSuccessful(res.status)) {
                refetch();
                 Swal.fire({
                   title: "Deleted!",
                   text: "User has been deleted",
                   icon: "success"
                 })
             }
           })
         }
        })
  };

  if (isLoading) return <Loading/>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        My Reviews
      </h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {review.property.name}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Agent:</span>{" "}
              {review.agent.name}
            </p>
            <p className="text-xs text-gray-500 mb-3">
              <span className="font-medium">Review Time:</span>{" "}
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Review:</span> {review.review}
            </p>
            <button
              onClick={() => handleDelete(review._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 italic">
          You have no reviews yet.
        </p>
      )}
    </div>
  );
};

export default MyReviews;
