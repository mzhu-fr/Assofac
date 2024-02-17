import { useContext } from 'react';
import { UserContext } from '../page/userContext';
import { Outlet, Navigate } from 'react-router-dom';

export default function Profile() {

    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/" />
    }

    return (
        <div className="profile-style">
            <Outlet />
        </div>
    )
}
