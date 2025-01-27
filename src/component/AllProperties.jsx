import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Page/Loading";
import PropertyCard from "../Page/Home/PropertyCard/PropertyCard";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AllProperties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/properties`
      );
      return data;
    },
  });

  if (isLoading) return <Loading />;

  // Filter properties based on search term
  const filteredProperties = properties?.filter((property) =>
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort properties based on price range
  const sortedProperties =
    sortOrder === "lowToHigh"
      ? [...filteredProperties].sort((a, b) => a.min_price - b.min_price) // Spread operator to clone the array
      : sortOrder === "highToLow"
      ? [...filteredProperties].sort((a, b) => b.max_price - a.max_price) // Clone and then sort
      : filteredProperties;

  return (
    <>
      <Helmet>
        <title>EstateHive | All Properties</title>
      </Helmet>

      {/* Search and Sort Inputs */}
      <div className="container mx-auto py-5 px-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Display Properties */}
      {sortedProperties && sortedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 container mx-auto py-10 px-5">
          {sortedProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-3xl py-10 text-center">No Data Available</p>
      )}
    </>
  );
};

export default AllProperties;
