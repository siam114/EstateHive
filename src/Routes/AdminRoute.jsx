import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Page/Loading";
import PropTypes from 'prop-types';

const AdminRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext)
    const isAdmin = user?.role === 'ADMIN'
    const location = useLocation()

    if(loading){
        return <Loading/>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };


export default AdminRoute;