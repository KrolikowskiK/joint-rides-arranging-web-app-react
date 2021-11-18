import * as React from "react";

export const Context = React.createContext({
  isAuthenticated: false,
  authenticate: () => {},
  signout: () => {},
});
