import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth";
import RequireAuth from "./components/RequireAuth";
import App from "./routes/App";
import Home from "./routes/Home";
import Rides from "./routes/Rides";
import RideDetails from "./routes/RideDetails";
import RideAdd from "./routes/RideAdd";
import RideEdit from "./routes/RideEdit";
import Friends from "./routes/Friends";
import Profile from "./routes/Profile";
import Cars from "./routes/Cars";
import CarAdd from "./routes/CarAdd";
import CarDetails from "./routes/CarDetails";
import CarEdit from "./routes/CarEdit";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import SignOut from "./routes/SignOut";
import "./styles/index.scss";

const app = document.getElementById("app");
ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route
            path="rides"
            element={
              <RequireAuth>
                <Rides />
              </RequireAuth>
            }
          />
          <Route
            path="rides/new"
            element={
              <RequireAuth>
                <RideAdd />
              </RequireAuth>
            }
          />
          <Route
            path="rides/:rideId"
            element={
              <RequireAuth>
                <RideDetails />
              </RequireAuth>
            }
          />
          <Route
            path="rides/:rideId/edit"
            element={
              <RequireAuth>
                <RideEdit />
              </RequireAuth>
            }
          />
          <Route
            path="friends"
            element={
              <RequireAuth>
                <Friends />
              </RequireAuth>
            }
          />
          <Route path="friends/:friendId" element={<></>} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="cars"
            element={
              <RequireAuth>
                <Cars />
              </RequireAuth>
            }
          />
          <Route
            path="cars/new"
            element={
              <RequireAuth>
                <CarAdd />
              </RequireAuth>
            }
          />
          <Route
            path="cars/:carId"
            element={
              <RequireAuth>
                <CarDetails />{" "}
              </RequireAuth>
            }
          />
          <Route
            path="cars/:carId/edit"
            element={
              <RequireAuth>
                <CarEdit />
              </RequireAuth>
            }
          />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signout" element={<SignOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  app
);
