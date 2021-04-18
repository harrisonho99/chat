import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import { SignIn } from "./components/SignIn/SignIn"
import { ProtectedRoute } from "./helper/Route/ProtectedRoute"
function App() {
  return (
    <Switch>
      <Route path="/signin">
        < SignIn />
      </Route>
      <ProtectedRoute path="/chat" fallbackRoute="/login">
      </ProtectedRoute>
    </Switch>
  )
}

export default App;
