import { Redirect, Route } from "react-router-dom"
import { useSelector } from "../../Global/bind-react/useSelector"
// import { useSelector } from "../../Global/bind-react/useSetGlobal"

const ProtectedRoute = ({ children, fallbackRoute, ...restProps }) => {
    let auth = useSelector((context) => (context.auth))
    return <Route {...restProps}
        render={({ location }) => (
            auth ? (children) :
                <Redirect
                    to={{
                        pathname: fallbackRoute,
                        state: { from: location }
                    }} />
        )}
    />
}
export { ProtectedRoute }