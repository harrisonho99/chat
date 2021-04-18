import './App.css';
import {
  Switch,
  Route, Link
} from "react-router-dom";
import { SignIn } from "./components/SignIn/SignIn"
import { SignUp } from "./components/SignUp/SignUp"
import { Home } from "./components/Home/Home"
import { Chat } from "./components/Chat/Chat"
import { ProtectedRoute } from "./helper/Route/ProtectedRoute"
import { NotFound } from "./components/NotFound/NotFound"
import { PrimarySearchAppBar } from "./common/PrimarySearchAppBar"
function App() {
  return (
    <>
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
          <Route path="/" exact children={<Home />} />
          <Route path="/signin" children={< SignIn />} />
          <Route path="/signup" children={<SignUp />} />
          <ProtectedRoute path="/chat" fallbackRoute="/signin" children={<Chat />}>
          </ProtectedRoute>
          <Route path="/*" children={<NotFound />} />
        </Switch>
      </main>

    </>
  )
}

export default App;
