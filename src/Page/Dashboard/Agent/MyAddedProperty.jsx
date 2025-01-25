import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import MyPropertyCard from "./MyPropertyCard";
import { useAuth } from "../../../hook/useAuth";
import useAxiosSecure from './../../../hook/useAxiosSecure';

const MyAddedProperty = () => {
  const axioSecure = useAxiosSecure()
    const {user} = useAuth()
    console.log(user)
    const { data: properties, isLoading } = useQuery({
        queryKey: ["user-properties"],
        queryFn: async () => {
          const { data } = await axioSecure.get(
            `/user-properties`
          );

          return data;
        },
      });
      if (isLoading) return <Loading />;
      console.log(properties)
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