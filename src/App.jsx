import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { UserContext } from "./UserContext.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userID, setUserID] = useState(false);
  const [signedUp, setUsersignedUp] = useState(false);
  const [userClasses, setUserClasses] = useState(false);
  const [userIsRegistered, setUserIsRegistered] = useState(false);

  return (
    <div className="app">
      <UserContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          token,
          setToken,
          userID,
          setUserID,
          signedUp,
          setUsersignedUp,
          userClasses,
          setUserClasses,
          userIsRegistered,
          setUserIsRegistered,
        }}
      >
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default App;
