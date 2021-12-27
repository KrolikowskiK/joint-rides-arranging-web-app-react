import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/Auth";
import RequireAuth from "./services/RequireAuth";
import App from "./components/App/App";
import Home from "./components/Rides/Home";
import Rides from "./components/Rides/Rides";
import RideDetails from "./components/Rides/RideDetails";
import RideAdd from "./components/Rides/RideAdd";
import RideEdit from "./components/Rides/RideEdit";
import Friends from "./components/Friends/Friends";
import Profile from "./components/Profile/Profile";
import Cars from "./components/Cars/Cars";
import CarAdd from "./components/Cars/CarAdd";
import CarDetails from "./components/Cars/CarDetails";
import CarEdit from "./components/Cars/CarEdit";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import SignOut from "./components/SignOut/SignOut";

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
