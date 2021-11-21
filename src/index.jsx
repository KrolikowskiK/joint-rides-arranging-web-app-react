import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./routes/App";
import Home from "./routes/Home";
import Rides from "./routes/Rides";
import Friends from "./routes/Friends";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import SignOut from "./routes/SignOut";

import "./styles/index.scss";

// TODO add shadows on elements
const app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="rides" element={<Rides />} />
        <Route path="friends" element={<Friends />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signout" element={<SignOut />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  app
);
