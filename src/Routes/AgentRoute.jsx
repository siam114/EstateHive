import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Page/Loading";
import PropTypes from 'prop-types';

const AgentRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext)
    const isAgent = user?.role === 'AGENT'
    const location = useLocation()

    if(loading){
        return <Loading/>
    }
    if(user && isAgent){
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

AgentRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };


export default AgentRoute;