import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineBars } from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      <Helmet>
        <title>EstateHive | Dashboard</title>
      </Helmet>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 z-50 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src="https://i.ibb.co/4ZXzmq5/logo.png"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="md:w-56 min-h-screen bg-[#363e94] text-white flex flex-col items-center pt-5">
          <ul className="menu font-semibold space-y-4">
            <li>
              <NavLink to="/dashboard/agentProfile">Agent Profile</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addProperty">Add Property</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myAdded">My added properties</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/mySold">My sold properties</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/request">Requested properties</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
