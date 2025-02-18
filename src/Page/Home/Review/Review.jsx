import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../Loading";
import axios from "axios";

const Review = () => {
  // const axiosSecure = useAxiosSecure();
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init();
  }, []);

  // Fetch reviews using useQuery
  const { data: reviews = [], isLoading, isError } = useQuery({

    queryKey: ["all-reviews"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-reviews?limit=3`);
      return data.map((review) => ({
        id: review._id,
        name: review.user.name,
        image: review.user.image,
        description: review.review,
        propertyTitle: review.property.name,
      }));
    },
    retry: false
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load reviews. Please try again later.
      </p>
    );
  }

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2
          className="text-4xl font-bold text-center mb-8"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Latest User Reviews
        </h2>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay={`${index * 300}`}
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-center text-gray-800 mb-2">
                {review.name}
              </h3>
              <p className="text-center text-sm text-gray-500 mb-2">
                {review.propertyTitle}
              </p>
              <p className="text-gray-600 text-sm text-center italic">
                {review.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
