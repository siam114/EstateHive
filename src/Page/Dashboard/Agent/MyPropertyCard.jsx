/* eslint-disable react/prop-types */

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const MyPropertyCard = ({ property }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    _id,
    name,
    min_price,
    max_price,
    location,
    image,
    agent,
    status
  } = property;


  const handleDelete = async() => {
    try {
      //post req
      await axiosSecure.delete(`/properties/${_id}`);
      toast.success("Property delete Successfully!");
      await queryClient.resetQueries({ queryKey: ["properties"], exact: false });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white w-full sm:w-[320px] md:w-[360px] lg:w-[400px] max-w-full mx-auto">
      {/* Property Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      {/* Property Title */}
      <h2 className="text-lg font-semibold mb-2">{name}</h2>

      {/* Property Location */}
      <p className="text-gray-600 text-sm mb-2">
        <strong>Location:</strong> {location}
      </p>

      {/* Agent Info */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={agent?.image}
          alt={agent?.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-gray-800 font-medium">{agent?.name}</span>
      </div>

      {/* Verification Status */}
      <p
        className={`text-sm font-medium mb-2 ${
          status == 'VERIFIED' ? "text-green-600" : "text-red-600"
        }`}
      >
        {status == 'VERIFIED' ? "Verified" : "Not Verified"}
      </p>

      {/* Price Range */}
      <p className="text-gray-800 font-semibold mb-4">
        <strong>Price Range:</strong> ${min_price} - ${max_price}
      </p>

      {/* Update and Delete Buttons */}
      <div className="flex gap-4 mt-4">
      <Link to={`/dashboard/update/${_id}`}>
      <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
        >
          Update
        </button>
      </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyPropertyCard;
