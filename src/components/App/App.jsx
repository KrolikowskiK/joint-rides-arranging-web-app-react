import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../services/Auth";
import Navbar from "../Navbar/Navbar";
import AuthNavbar from "../Navbar/AuthNavbar";
import * as css from "./app.module.scss";

export default function App() {
  const { token } = useAuth();

  return (
    <>
      {token ? <AuthNavbar /> : <Navbar />}
      <main className={css.main}>
        <Outlet />
      </main>
    </>
  );
}
