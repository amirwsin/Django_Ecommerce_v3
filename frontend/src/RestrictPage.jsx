import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const RestrictPage = ({children, path, type}) => {
    const {isAuthenticated} = useSelector(state => state.authReducer)
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
            return children
        default:
            return <Navigate to={"/"} replace/>
    }
}

export default RestrictPage