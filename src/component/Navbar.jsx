import { Link, NavLink } from "react-router-dom";
import {  useContext,useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { AuthContext } from "../context/AuthProvider";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import logo from '/logo.jpg'


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const links = (
    <div className=" flex flex-col md:flex-row gap-2 md:gap-5 font-semibold">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About Us</NavLink>
      <NavLink to="/allProperties">All properties</NavLink>
      <NavLink to="/dashboard">Dashboard </NavLink>
    </div>
  );
  const links1 =(
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 font-semibold">
         <NavLink to="/">Home</NavLink>
         <NavLink to="/about">About Us</NavLink>
    </div>
  )
  return (
    <div className="navbar fixed z-50 bg-blue-100 w-full mx-auto md:px-10 py-2 ">
      <div className="navbar-start">
      <div className="dropdown">
          <div
            tabIndex={0}
            onClick={() => setOpen(!open)}
            className="btn btn-sm !px-1.5 text-xl lg:hidden "
          >
            {open === true ? <IoCloseSharp /> : <IoMdMenu />}
          </div>
          {open && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100  font-semibold text-black rounded-box z-[50] mt-3 w-52 p-5 shadow"
            >
              {links}
            </ul>
          )}
        </div>
        <Link to='/'>
         <div className="flex gap-.5 items-center">
          <img className="sm:w-10 sm:h-10 w-8 h-8 ml-1 rounded-full" src={logo} alt="" />
          <p className="font-bold ml-2 md:text-2xl text-lg text-[#363e94]">EstateHive</p>
         </div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        {user? (
          <ul className="menu menu-horizontal px-1">
          {links}
          </ul>
        ) :(
          <ul className="menu menu-horizontal px-1">
          {links1}
         </ul>
        )}
      </div>

      <div className="navbar-end">
        {user && user?.email ? (
          <div className="flex flex-col items-center">
            <img
             data-tooltip-id="user-tooltip"
             data-tooltip-content={user?.displayName || "No username available"}
              className="w-8 h-8 rounded-full"
              referrerPolicy='no-referrer'
              src={user?.photoURL}
              alt=''
            />
           <p className="font-semibold text-sm hidden md:block"> {user && user?.displayName}</p>
            <ReactTooltip id="user-tooltip" place="left" type="dark" effect="float" />
          </div>
        ) : null}

        {user && user?.email ? (
          <button onClick={logOut} className="btn btn-sm font-semibold ml-3 bg-[#363e942d]">
            Log-Out
          </button>
        ) : (
          <Link to="/login" className="btn btn-sm font-semibold ml-3 bg-[#363e942d]">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
