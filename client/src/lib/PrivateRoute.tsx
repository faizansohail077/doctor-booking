import { Pages } from '@/pages';
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { getUser } from './helpers';

const PrivateRoute = ({ children, roles }: { children: ReactNode, roles: string[] }) => {
    // const user = JSON.parse(localStorage.getItem('user'));
    const user = getUser()
    console.log(user, 'user')
    let location = useLocation();

    const loading = false

    if (loading) {
        return <p className="container">Checking auth..</p>;
    }

    const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (user && !userHasRequiredRole) {
        return <Pages.PageNotFound />; // build your won access denied page (sth like 404)
    }
    return children;
};

export default PrivateRoute