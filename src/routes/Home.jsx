import React from "react";
import { UserContext } from "./App";
import Browser from "../components/Browser";

export default function Home() {
  const context = React.useContext(UserContext);

  const content = context.state.isAuthenticated ? (
    <h1>Jesteś zalogowany</h1>
  ) : (
    <Browser />
  );
  return <>{content}</>;
}
