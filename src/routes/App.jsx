import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../components/Auth";
import Navbar from "../components/Navbar";
import AuthNavbar from "../components/AuthNavbar";
import * as css from "../styles/app.module.scss";

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
