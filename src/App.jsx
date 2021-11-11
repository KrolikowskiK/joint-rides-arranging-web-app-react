import * as React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./routes/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
