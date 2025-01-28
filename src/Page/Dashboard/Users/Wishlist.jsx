import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import { toast } from "react-toastify";
import isSuccessful from './../../../helper/status';

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch reviews using useQuery
  const { data: wishlist = [], isLoading,refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/wishlist`
      ); 
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/wishlist/${id}`);
      if (isSuccessful(res.status)) {
        toast.success("Item deleted successfully!");
        refetch();
      } else {
        toast.error("Failed to delete the item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting the item.");
    }
  };
  if (isLoading) return <Loading/>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {wishlist.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={item?.property?.image}
            alt={item?.property?.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {item?.property?.name}
            </h3>
            <p className="text-gray-600">{item?.property?.location}</p>
            <div className="flex items-center space-x-2 mt-2">
              <img
                src={item?.agent?.image}
                alt={item?.agent?.name}
                className="w-10 h-10 rounded-full"
              />
              <p className="text-gray-800">
                Agent: <span className="font-medium">{item?.agent?.name}</span>
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Verification: {item?.property?.status}
            </p>
            <p className="text-lg font-semibold text-gray-900 mt-2">
              Price Range: ${item?.property?.min_price} - ${item?.property?.max_price}
            </p>

            <div className="flex justify-between items-center mt-4">
              <Link
                to={`/dashboard/property/${item?._id}/make_offer`}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                Make an Offer
              </Link>
              <button 
               onClick={() => handleDelete(item._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
