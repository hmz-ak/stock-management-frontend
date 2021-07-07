import Appbar from "./components/Drawer";
import Login from "./components/auth/Login";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <div>
        <ToastContainer />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Appbar} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
