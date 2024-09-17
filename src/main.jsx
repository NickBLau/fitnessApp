import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ClassDetails from "./pages/ClassDetails.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Schedule from "./pages/Schedule.jsx";
import Search from "./pages/Search.jsx";
import Welcome from "./pages/Welcome.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Welcome />} />
      <Route path="/ClassDetails/:id" element={<ClassDetails />} />
      <Route path="/Home/" element={<Home />} />
      <Route path="Login/" element={<Login />} />
      <Route path="Schedule/" element={<Schedule />} />
      <Route path="Search/" element={<Search />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
