
import { Redirect, Route } from "react-router-dom"
import { useSelector } from "../../Global/bind-react/useSelector"

const PublicRoute = ({ component: Component, ...restProps }) => {
    let auth = useSelector((context) => (context.auth))
    return <Route {...restProps}
        render={(props) => {
            return (
                !auth ? <Component {...props} /> :
                    <Redirect
                        to="/chat" />
            )
        }}
    />
}
export { PublicRoute }

