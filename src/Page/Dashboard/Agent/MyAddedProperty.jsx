import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import MyPropertyCard from "./MyPropertyCard";
import useAxiosSecure from "./../../../hook/useAxiosSecure";

const MyAddedProperty = () => {
  const axioSecure = useAxiosSecure();
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties","user-properties"],
    queryFn: async () => {
      const { data } = await axioSecure.get(`/user-properties`);

      return data;
    },
  });
  if (isLoading) return <Loading />;
  return (
    <div>
      {properties && properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 container mx-auto py-10 px-5">
          {properties.map((property) => (
            <MyPropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-3xl py-10 text-center">No Data Available</p>
      )}
    </div>
  );
};

export default MyAddedProperty;
