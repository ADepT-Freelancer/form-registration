import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Authorization } from "./components/authorization/authorization";
import { ForgetPassword } from "./components/forgetPassword/forgetPassword";
import { Registration } from "./components/registration/registration";
import { HomePage } from "./components/homePage/home";

function App() {
  return (
    <div className="app__wrapper">
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/auth" element={<Authorization />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}
export default App;
