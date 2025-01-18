import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Page/Loading';

const PrivateRoute = ({children}) => {
    const { user,loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);
    if(loading){
        return <Loading/>
    }
    if(user && user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default PrivateRoute;