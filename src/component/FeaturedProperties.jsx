import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import image1 from '../assets/property-2.jpg'
import image2 from '../assets/villa.jpg'
import image3 from '../assets/cortage.webp'

const FeaturedProperties = () => {
  useEffect(() => {
    AOS.init(); 
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2
          className="text-4xl font-bold text-center mb-8"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Property 1 */}
          <div
            className="p-6 bg-white rounded-lg shadow-md"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <img
              src={image1}
              alt="Property 1"
              className="rounded mb-4 h-[200px] w-full"
            />
            <h3 className="text-xl font-bold mb-2">Modern Apartment</h3>
            <p>
              Located in New York City, perfect for families and professionals.
            </p>
          </div>
          {/* Property 2 */}
          <div
            className="p-6 bg-white rounded-lg shadow-md"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <img
              src={image2}
              alt="Property 2"
              className="rounded mb-4 h-[200px] w-full"
            />
            <h3 className="text-xl font-bold mb-2">Luxury Villa</h3>
            <p>A luxurious villa with ocean views, situated in California.</p>
          </div>
          {/* Property 3 */}
          <div
            className="p-6 bg-white rounded-lg shadow-md"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="900"
          >
            <img
              src={image3}
              alt="Property 3"
              className="rounded mb-4 h-[200px] w-full"
            />
            <h3 className="text-xl font-bold mb-2">Cozy Cottage</h3>
            <p>A cozy cottage surrounded by nature, perfect for relaxation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
