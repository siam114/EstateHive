/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const {
    _id,
    name,
    min_price,
    max_price,
    location,
    image,
    agent,
    status,
  } = property;

  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/property/${_id}`);  // Redirect to Property Details page
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

      {/* Details Button */}
      <button
        onClick={handleDetailsClick}
        className="bg-[#363e94] text-white py-2 px-4 rounded hover:bg-[#363e94dc] transition w-full"
      >
        Details
      </button>
    </div>
  );
};

export default PropertyCard;
