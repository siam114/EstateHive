import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import PaymentModal from "./PaymentModal";

const PropertyBought = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["offered-properties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offered-properties`);
      return data;
    },
    retry: false,
  });

  if (isLoading) return <Loading />;

  const handlePayClick = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {properties.map((property, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={property?.property?.image}
              alt={property?.property?.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {property?.property?.name}
              </h3>
              <p className="text-gray-600">{property?.property?.location}</p>
              <p className="text-gray-800 mt-2">
                Agent:{" "}
                <span className="font-medium">{property?.agent?.name}</span>
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                Offered Amount: ${property?.offer_amount}
              </p>

              <div className="mt-4">
                <p
                  className={`text-sm font-medium ${
                    property?.status === "PENDING"
                      ? "text-yellow-600"
                      : property?.status === "ACCEPTED"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  Status: {property?.status == 'PAID' ? 'BOUGHT' : property?.status}
                </p>
                {property?.status === "ACCEPTED" && (
                  <button
                    onClick={() => handlePayClick(property)}
                    className="mt-2 px-4 py-2 w-full bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                  >
                    Pay
                  </button>
                )}
                {property?.status === "PAID" && (
                  <p className="mt-2 text-sm text-gray-600">
                    Transaction ID:{" "}
                    {property?.transection_id}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <PaymentModal property={selectedProperty} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default PropertyBought;
