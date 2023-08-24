import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Authorization } from "./components/authorization/authorization";
import { ForgetPassword } from "./components/forgetPassword/forgetPassword";
import { Registration } from "./components/registration/registration";
import { HomePage } from "./components/homePage/home";
import { Article } from "./components/Article/article";

function App() {
  return (
    <div className="app__wrapper">
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/auth" element={<Authorization />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/article" element={<Article />} />
        <Route path="/" element={<Navigate to="/auth" />} />

      </Routes>
    </div>
  );
}
export default App;
