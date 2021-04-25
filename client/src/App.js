import './App.css';
import {
  Switch,
  Link
} from "react-router-dom";
import { SignIn } from "./components/SignIn/SignIn"
import { SignUp } from "./components/SignUp/SignUp"
import { Home } from "./components/Home/Home"
import { Chat } from "./components/Chat/Chat"
import { ProtectedRoute } from "./helper/Route/ProtectedRoute"
import { NotFound } from "./components/NotFound/NotFound"
import { PrimarySearchAppBar } from "./common/PrimarySearchAppBar"
import { ThemeProvider, useTheme } from "@material-ui/core"
import { persistLocalStorage } from "./helper/tool/persistLocalStorage"
import { useSetGlobalContext } from "./Global/bind-react/useSetGlobal"
import { useEffect } from "react"
import { PublicRoute } from "./helper/Route/PublicRoute"
function App() {
  const theme = useTheme()
  const setContext = useSetGlobalContext()
  useEffect(() => {
    persistLocalStorage(setContext)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <PrimarySearchAppBar />
        <main id="main-content">
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/signin">Sign In Page</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up Page</Link>
            </li>
            <li>
              <Link to="/chat">Chat Page</Link>
            </li>
          </ul>
          <Switch>
            <PublicRoute path="/" exact component={Home} />
            <PublicRoute path="/signin" component={SignIn} />
            <PublicRoute path="/signup" component={SignUp} />
            <ProtectedRoute path="/chat/:id" fallbackRoute="/signin" children={<Chat />} />
            <ProtectedRoute path="/chat" fallbackRoute="/signin" children={<Chat />} />
            <PublicRoute path="/*" component={NotFound} />
          </Switch>
        </main>
      </ThemeProvider>
    </>
  )
}

export default App;
