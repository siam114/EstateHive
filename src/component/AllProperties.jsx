import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Page/Loading";
import PropertyCard from "../Page/Home/PropertyCard/PropertyCard";
import { Helmet } from "react-helmet-async";

const AllProperties = () => {
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
  return (
    <>
      <Helmet>
        <title>EstateHive | All Properties</title>
      </Helmet>
      {properties && properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 container mx-auto py-10">
          {properties.map((property) => (
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
