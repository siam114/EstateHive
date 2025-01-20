import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

AOS.init();

const About = () => {
  return (
    <div>
      <Helmet>
        <title>EstateHive | About</title>
      </Helmet>
      <section className="py-12">
        <div className="container mx-auto px-6 text-gray-800">
          <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>

          <p className="text-lg text-center max-w-3xl mx-auto mb-6">
            Welcome to{" "}
            <span className="font-bold text-[#363e94]">EstateHive</span>, your
            trusted platform for discovering, buying, and selling real estate
            properties. Whether you’re searching for your dream home, a
            lucrative investment opportunity, or simply need to list your
            property, EstateHive is here to make it happen effortlessly.
          </p>

          <div
            data-aos="zoom-in-up"
            data-aos-duration="2000"
            data-aos-once="true"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
          >
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2">Wide Property Listings</h3>
              <p>
                Explore an extensive range of real estate properties, including
                residential, commercial, and rental options tailored to meet
                your preferences.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2">Trusted by Thousands</h3>
              <p>
                Join thousands of satisfied clients who trust EstateHive for
                finding and listing properties with transparency and
                reliability.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
              <p>
                Benefit from expert real estate advice and tools designed to
                help you make informed decisions in buying or selling
                properties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
