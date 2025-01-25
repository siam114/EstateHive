const PropertyBought = () => {
  const properties = [
    {
      location: "New York, USA",
      title: "Luxury Apartment",
      image: "https://via.placeholder.com/300",
      agent: "John Doe",
      offeredAmount: "$500,000",
      status: "pending",
      transactionId: null,
    },
    {
      location: "Los Angeles, USA",
      title: "Cozy Condo",
      image: "https://via.placeholder.com/300",
      agent: "Jane Smith",
      offeredAmount: "$300,000",
      status: "accepted",
      transactionId: null,
    },
    {
      location: "Chicago, USA",
      title: "Modern House",
      image: "https://via.placeholder.com/300",
      agent: "Michael Johnson",
      offeredAmount: "$750,000",
      status: "bought",
      transactionId: "TX1234567890",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {properties.map((property, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {property.title}
            </h3>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-gray-800 mt-2">
              Agent: <span className="font-medium">{property.agent}</span>
            </p>
            <p className="text-lg font-semibold text-gray-900 mt-2">
              Offered Amount: {property.offeredAmount}
            </p>

            <div className="mt-4">
              <p
                className={`text-sm font-medium ${
                  property.status === "pending"
                    ? "text-yellow-600"
                    : property.status === "accepted"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                Status:{" "}
                {property.status.charAt(0).toUpperCase() +
                  property.status.slice(1)}
              </p>
              {property.status === "pending" && (
                <button className="mt-2 px-4 py-2 w-full bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition">
                  Offer Pending
                </button>
              )}
              {property.status === "accepted" && (
                <button
                  onClick={() => alert("Redirecting to payment page")}
                  className="mt-2 px-4 py-2 w-full bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  Pay
                </button>
              )}
              {property.status === "bought" && (
                <p className="mt-2 text-sm text-blue-600">
                  Payment Completed. Transaction ID: {property.transactionId}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyBought;
