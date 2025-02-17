import { FaFacebook, FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-white my-10">
            
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-10">
                Feel free to reach out to us through any of the platforms below.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 text-xl">
                <a href="mailto:smsiam987@gmail.com" className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition">
                    <FaEnvelope className="text-blue-500 text-2xl" /> smsiam987@gmail.com
                </a>
                <p className="flex items-center gap-3 cursor-pointer hover:text-green-500 transition">
                    <FaPhone className="text-green-500 text-2xl" /> +8801567989506
                </p>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-8 mt-10">
                <Link to="https://www.facebook.com/sumsuzzaman.siam" target="_blank" rel="noopener noreferrer" className="text-4xl transform hover:scale-110 transition duration-300 text-blue-600">
                    <FaFacebook />
                </Link>
                <Link to="https://www.linkedin.com/in/sm-siam598" target="_blank" rel="noopener noreferrer" className="text-4xl transform hover:scale-110 transition duration-300 text-blue-700">
                    <FaLinkedin />
                </Link>
                <Link to="https://x.com/SMSiam233877" target="_blank" rel="noopener noreferrer" className="text-4xl transform hover:scale-110 transition duration-300 text-blue-400">
                    <FaTwitter />
                </Link>
                <Link to="https://github.com/siam114" target="_blank" rel="noopener noreferrer" className="text-4xl transform hover:scale-110 transition duration-300 text-gray-800">
                    <FaGithub />
                </Link>
            </div>
        </div>
    );
};

export default Contact;
