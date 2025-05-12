import BannerSlider from "../../../component/BannerSlider";
import FeaturedProperties from "../../../component/FeaturedProperties";
import { Helmet } from "react-helmet-async";
import Review from "../Review/Review";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Loading";
import PropertyCard from "../PropertyCard/PropertyCard";
import Faq from "./Faq";
import Newslatter from "../../../component/Newslatter";
import LatestProperty from "../../../component/LatestProperty";
import OfficeLocation from "../../../component/Modal/OfficeLocation";

const Home = () => {
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
    <div>
      <Helmet>
        <title>EstateHive | Home</title>
      </Helmet>

      <BannerSlider />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 container mx-auto py-16 px-5">
        {properties.slice(0, 3).map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      <FeaturedProperties />
      <LatestProperty />
      <Review />
      <Newslatter />
      <div className="container mx-auto my-10">
        <Faq />
        <OfficeLocation/>
      </div>
    </div>
  );
};

export default Home;
