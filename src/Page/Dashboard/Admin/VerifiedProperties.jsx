import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Loading";

const VerifiedProperties = () => {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["manage-property"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/properties?status=VERIFIED`
      );

      return data;
    },
  });
  if (isLoading) return <Loading />;

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
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{property?.name}</td>
              <td className="border border-gray-300 px-4 py-2">{property?.location}</td>
              <td className="border border-gray-300 px-4 py-2">{property?.agent?.name}</td>
              <td className="border border-gray-300 px-4 py-2">{property?.agent?.email}</td>
              <td className="border border-gray-300 px-4 py-2">${property?.min_price} - ${property?.max_price}</td>
              <td className="border border-gray-300 px-4 py-2">
                {property.status === "VERIFIED" && (
                  <span className="text-green-600 font-bold">Verified</span>
                )}
                {property.status === "REJECTED" && (
                  <span className="text-red-600 font-bold">Rejected</span>
                )}
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerifiedProperties;
