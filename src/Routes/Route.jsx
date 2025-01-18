import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home/Home";
import About from "../component/About";
import LogIn from "../Page/LogIn";
import Register from "../Page/Register";

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