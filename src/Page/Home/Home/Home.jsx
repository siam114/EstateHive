import BannerSlider from "../../../component/BannerSlider";
import FeaturedProperties from "../../../component/FeaturedProperties";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>EstateHive | Home</title>
            </Helmet>
            
            <BannerSlider/>
            <FeaturedProperties/>
        </div>
    );
};

export default Home;