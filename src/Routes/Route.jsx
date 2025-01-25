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
import ManageUsers from "../Page/Dashboard/Admin/ManageUsers";
import ManageProperties from './../Page/Dashboard/Admin/ManageProperties';
import ManageReviews from './../Page/Dashboard/Admin/ManageReviews';
import Profile from "../Page/Dashboard/Admin/Profile";
import MyReviews from "../Page/Dashboard/Users/MyReviews";
import Wishlist from "../Page/Dashboard/Users/Wishlist";
import PropertyBought from "../Page/Dashboard/Users/PropertyBought";
import MyAddedProperty from "../Page/Dashboard/Agent/MyAddedProperty";
import MakeOffer from "../Page/Dashboard/Users/MakeOffer";
import MySoldProperty from "../Page/Dashboard/Agent/MySoldProperty";
import RequestProperty from "../Page/Dashboard/Agent/RequestProperty";

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
          element: <PrivateRoute><PropertyDetails/></PrivateRoute>
        },
        {
          path:'/property/:id/make_offer',
          element: <MakeOffer/>
         },
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children:[
        {
          index: true,
          element: <Profile/>
       },
       {
        path: 'reviews',
        element: <MyReviews/>
       },
       {
        path: 'wishlist',
        element: <Wishlist/>
       },
     
       {
        path: 'propertyBought',
        element: <PropertyBought/>
       },
       //agent
        {
          path: 'addProperty',
          element: <AddProperty/>
        },
        {
          path: 'myAdded',
          element: <MyAddedProperty/>
        },
        {
          path:'mySold',
          element: <MySoldProperty/>
        },
        {
          path: 'request',
          element: <RequestProperty/>
        },
        
        //admin routes
       
        {
          path: 'manageUsers',
          element: <ManageUsers/>
        },
        {
          path: 'manageProperties',
          element: <ManageProperties/>
        },
        {
          path: 'manageReviews',
          element: <ManageReviews/>
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