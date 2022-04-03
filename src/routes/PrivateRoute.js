import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "../context/authContext";



// function PrivateRoute({ element: Component, authenticated, ...rest }) {
//     return (

//         <Routes>
//             <Route
//                 {...rest}
//                 render={(props) => authenticated === true
//                     ? <Outlet />
//                     : <Navigate to='/login' />}
//             />
//         </Routes>


//     )
// }

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <h1>Loading...</h1>;

    return user ? <Outlet /> : <Navigate to="/login" />;
    return <>{children}</>;
};

export default PrivateRoute;