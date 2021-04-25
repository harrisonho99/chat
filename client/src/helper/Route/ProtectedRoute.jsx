import { Redirect, Route } from "react-router-dom"
import { useSelector } from "../../Global/bind-react/useSelector"

const ProtectedRoute = ({ children, fallbackRoute, ...restProps }) => {
    let auth = useSelector((context) => (context.auth))
    return <Route {...restProps}
        render={({ location }) => {
            return (
                auth ? (children) :
                    <Redirect
                        to={{
                            pathname: fallbackRoute,
                            state: { from: location }
                        }} />
            )
        }}
    />
}
export { ProtectedRoute }