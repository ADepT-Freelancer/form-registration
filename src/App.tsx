import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Authorization } from "./components/authorization/authorization";
import { ForgetPassword } from "./components/forgetPassword/forgetPassword";
import { Registration } from "./components/registration/registration";
import { HomePage } from "./components/homePage/home";
import { Article } from "./components/Article/article";
import { Header } from "./components/Header/header";
import { PrivateRoute } from "./components/router/privatRouter";
import { TestPage } from "./components/test/test";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-wrapper-content-inside">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>

          <Route path="/registration" element={<Registration />} />
          <Route path="/auth" element={<Authorization />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/article" element={<Article />} />
          <Route path="/" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
