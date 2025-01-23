import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Page/Loading';
import { useAuth } from '../hook/useAuth';

const PrivateRoute = ({children}) => {
    const { user,loading } = useAuth();
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