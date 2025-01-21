import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home/Home";
import About from "../component/About";
import LogIn from "../Page/LogIn";
import Register from "../Page/Register";
import Dashboard from "./Dashboard";
import AddProperty from "../Page/Dashboard/Agent/AddProperty";
import AllProperties from "../component/AllProperties";
import PropertyDetails from "../Page/Home/PropertyCard/PropertyDetails";
import PrivateRoute from "./PrivateRoute";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
          path: '/about',
          element: <About/>
        },
        {
          path: '/allProperties',
          element: <AllProperties/>
        },
        {
          path: '/property/:id',
          element: <PropertyDetails/>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children:[
        {
          path: 'addProperty',
          element: <AddProperty/>
        }
      ]
    },
    {
      path: '/login',
      element: <LogIn/>
    },
    {
      path: "/register",
      element: <Register/>
    }
  ]);

  export default router