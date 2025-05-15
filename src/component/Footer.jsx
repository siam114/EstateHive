import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import logo from "/logo.jpg";
import { useState } from "react";

const Footer = () => {
  const [close, setClose] = useState(false);
  return (
    <>
      <footer className="footer footer-center dark:text-[#363e94] dark:bg-slate-300 bg-[#363e94] text-white rounded p-10">
        <div>
          <div className="flex gap-2 items-center">
            <img className="w-12 h-12 rounded-full" src={logo} alt="" />
            <h2 className="text-3xl font-bold text-white">EstateHive</h2>
          </div>
          <p className="md:w-[500px]">
            <span>EstateHive&apos;s</span> Real
            Estate Information platform provides the latest updates and insights
            into the property market. Explore a wide range of real estate
            options tailored to meet your preferences and needs.
          </p>
        </div>

        <nav className="grid md:grid-flow-col gap-4">
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/about" className="link link-hover">
            About us
          </Link>
          <Link to="/contact" className="link link-hover">
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
      {!close && (
        <div className="fixed inset-x-0 bottom-0 z-50">
          <div className="relative flex items-center justify-between gap-4 bg-indigo-600 px-4 py-3 text-white">
            <p className="text-sm font-medium">
              Looking for the perfect property? 🏡
              <a
                href="/allProperties"
                className="inline-block underline text-sky-100 hover:text-sky-300"
              >
                Explore our latest listings now!
              </a>
            </p>

            <button
              aria-label="Close"
              onClick={() => setClose(true)}
              className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
