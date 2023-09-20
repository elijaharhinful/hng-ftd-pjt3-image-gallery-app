import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Auth';

function PrivateRoute({ children }) {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    
    if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" state={{ from: location }} />
    }
    // authorized so return child components
    return children;
}

export default PrivateRoute;