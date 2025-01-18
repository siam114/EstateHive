import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import logo from '/logo.jpg'

const Footer = () => {
  return (
    <footer className="footer footer-center dark:text-[#363e94] dark:bg-slate-300 bg-[#363e94] text-white rounded p-10">
      <div>
        <div className="flex gap-2 items-center">
          <img className="w-12 h-12 rounded-full" src={logo} alt="" />
          <h2 className="text-3xl font-bold text-white">EstateHive</h2>
        </div>
        <p className="md:w-[500px]">
          <span className="text-yellow-300">EstateHive&apos;s</span> Real Estate
          Information platform provides the latest updates and insights into the
          property market. Explore a wide range of real estate options tailored
          to meet your preferences and needs.
        </p>
      </div>

      <nav className="grid md:grid-flow-col gap-4">
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/about" className="link link-hover">
          About us
        </Link>
        <Link to="/auth/register" className="link link-hover">
          Contact
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col text-2xl gap-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="text-blue-500"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            className="text-green-500"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="text-blue-400"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            className="text-red-500"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="text-blue-700"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FcGoogle />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by
          EstateHive
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
