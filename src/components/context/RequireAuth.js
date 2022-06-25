import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "./authContext"

const RequireAuth = ({ children }) => {
    const { user } = useContext(AuthContext)
    const location = useLocation()
    const locationParams = location.pathname.split("/").slice(1, location.pathname.length);
    const [base, id] = locationParams;

    if (!user)
        return (
            <Navigate
                to={id ? `/login/?redirect=${base}&&id=${id}` : `/login/?redirect=${base}`}
                state={{ from: location }}
                replace />)

    return children;
}

export default RequireAuth;