import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const RestrictPage = ({children, path, type}) => {
    const {isAuthenticated, user} = useSelector(state => state.authReducer)
    const readyUser = JSON.parse(user)
    switch (type) {
        case ("isAuthenticated"):
            if (isAuthenticated) {
                return children
            }
            return <Navigate to={path} replace/>
        case ("isAnonymous"):
            if (!isAuthenticated) {
                return children
            }
            return <Navigate to={path} replace/>
        case ("isAdmin"):
            if (readyUser?.is_staff || readyUser?.is_superuser) {
                return children
            }
            return <Navigate to={path} replace/>
        default:
            return <Navigate to={"/"} replace/>
    }
}

export default RestrictPage