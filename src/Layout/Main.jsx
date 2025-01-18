import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <div>
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Main;