

const ManageProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      location: "New York, NY",
      agentName: "John Doe",
      agentEmail: "john.doe@example.com",
      priceRange: "$2000 - $2500",
      status: null,
    },
    {
      id: 2,
      title: "Cozy Cottage",
      location: "Austin, TX",
      agentName: "Jane Smith",
      agentEmail: "jane.smith@example.com",
      priceRange: "$1500 - $1800",
      status: "verified",
    },
    {
      id: 3,
      title: "Luxury Villa",
      location: "Miami, FL",
      agentName: "Alice Brown",
      agentEmail: "alice.brown@example.com",
      priceRange: "$5000 - $6000",
      status: "rejected",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Manage Properties</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Property Title</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Agent Name</th>
            <th className="border border-gray-300 px-4 py-2">Agent Email</th>
            <th className="border border-gray-300 px-4 py-2">Price Range</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{property.title}</td>
              <td className="border border-gray-300 px-4 py-2">{property.location}</td>
              <td className="border border-gray-300 px-4 py-2">{property.agentName}</td>
              <td className="border border-gray-300 px-4 py-2">{property.agentEmail}</td>
              <td className="border border-gray-300 px-4 py-2">{property.priceRange}</td>
              <td className="border border-gray-300 px-4 py-2">
                {property.status === "verified" && (
                  <span className="text-green-600 font-bold">Verified</span>
                )}
                {property.status === "rejected" && (
                  <span className="text-red-600 font-bold">Rejected</span>
                )}
                {!property.status && (
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Verify
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;
