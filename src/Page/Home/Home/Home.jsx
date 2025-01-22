import BannerSlider from "../../../component/BannerSlider";
import FeaturedProperties from "../../../component/FeaturedProperties";
import { Helmet } from 'react-helmet-async';
import Review from "../Review/Review";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>EstateHive | Home</title>
            </Helmet>
            
            <BannerSlider/>
            <FeaturedProperties/>
            <Review/>
        </div>
    );
};

export default Home;