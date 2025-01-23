import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineBars } from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isActive, setActive] = useState(false);
  const isAdmin = true;

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

      {/* Dashboard Layout */}
      <div className="flex min-h-screen overflow-y-hidden">
        {/* Sidebar */}
        <div
          className={`md:fixed flex flex-col h-full justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
            isActive ? "-translate-x-full" : "translate-x-0"
          } md:translate-x-0 transition duration-200 ease-in-out`}
        >
          <div className="md:w-64 bg-[#363e94] text-white flex flex-col h-full items-center pt-5">
            <ul className="menu font-semibold space-y-4 w-full  text-center">
              {isAdmin ? (
                <>
                  <li>
                    <NavLink
                      className="block py-2 hover:bg-[#4a56b5] rounded-md"
                      to="/dashboard/adminProfile"
                    >
                      Admin Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block py-2 hover:bg-[#4a56b5] rounded-md"
                      to="/dashboard/manageProperties"
                    >
                      Manage Properties
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block py-2 hover:bg-[#4a56b5] rounded-md"
                      to="/dashboard/manageUsers"
                    >
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block py-2 hover:bg-[#4a56b5] rounded-md"
                      to="/dashboard/manageReviews"
                    >
                      Manage Reviews
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      className="block py-2 hover:bg-[#4a56b5] rounded-md"
                      to="/dashboard/agentProfile"
                    >
                      Agent Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block py-2 hover:bg-[#4a56b5] rounded-md"
                      to="/dashboard/addProperty"
                    >
                      Add Property
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block py-2 hover:bg-[#4a56b5] rounded-md"
                      to="/dashboard/myAdded"
                    >
                      My Added Properties
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block py-2 hover:bg-[#4a56b5] rounded-md"
                      to="/dashboard/mySold"
                    >
                      My Sold Properties
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block py-2 hover:bg-[#4a56b5] rounded-md"
                      to="/dashboard/request"
                    >
                      Requested Properties
                    </NavLink>
                  </li>
                </>
              )}

              <div className="w-full px-4">
                <hr className="border-gray-400" />
              </div>

              <li>
                <NavLink
                  className="block py-2 hover:bg-[#4a56b5] rounded-md"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 hover:bg-[#4a56b5] rounded-md"
                  to="/allProperties"
                >
                  All Properties
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 md:ml-64 bg-gray-50 transition-all duration-200`}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
