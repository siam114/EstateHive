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
import UpdateCard from "../Page/Dashboard/Agent/UpdateCard";
import AdminRoute from "./AdminRoute";
import VerifiedProperties from "../Page/Dashboard/Admin/VerifiedProperties";
import AgentRoute from "./AgentRoute";
import Contact from "../component/Contact";

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
          path: 'contact',
          element: <Contact/>
        }
      
       
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children:[
        {
          index: true,
          element: <PrivateRoute><Profile/></PrivateRoute>
       },
       {
        path: 'reviews',
        element: <PrivateRoute><MyReviews/></PrivateRoute>
       },
       {
        path: 'wishlist',
        element: <PrivateRoute><Wishlist/></PrivateRoute>
       },
       {
        path:'property/:id/make_offer',
        element: <PrivateRoute><MakeOffer/></PrivateRoute>
       },
     
       {
        path: 'propertyBought',
        element: <PrivateRoute><PropertyBought/></PrivateRoute>
       },
       //agent
        {
          path: 'addProperty',
          element: <PrivateRoute>
            <AgentRoute><AddProperty/></AgentRoute>
          </PrivateRoute>
        },
        {
          path: 'myAdded',
          element: <PrivateRoute>
            <AgentRoute><MyAddedProperty/></AgentRoute>
          </PrivateRoute>
        },
        {
          path:'mySold',
          element: <PrivateRoute>
            <AgentRoute><MySoldProperty/></AgentRoute>
          </PrivateRoute>
        },
        {
          path: 'request',
          element: <PrivateRoute>
            <AgentRoute><RequestProperty/></AgentRoute>
          </PrivateRoute>
        },
        {
          path: 'update/:id',
          element: <PrivateRoute>
            <AgentRoute><UpdateCard/></AgentRoute>
          </PrivateRoute>,
          loader: ({params}) => fetch(`https://my-assignment12-estate-hive-server.vercel.app/properties/${params.id}`)
         },
        
        //admin routes
       
        {
          path: 'manageUsers',
          element:
            <PrivateRoute>
              <AdminRoute><ManageUsers/></AdminRoute>
            </PrivateRoute>
        },
        {
          path: 'manageProperties',
          element: <PrivateRoute>
            <AdminRoute><ManageProperties/></AdminRoute>
          </PrivateRoute>
        },
        {
          path: 'manageReviews',
          element: <PrivateRoute>
            <AdminRoute><ManageReviews/></AdminRoute>
          </PrivateRoute>
        },
        {
          path: 'advertisement',
          element: <PrivateRoute>
            <AdminRoute><VerifiedProperties/></AdminRoute>
          </PrivateRoute>
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