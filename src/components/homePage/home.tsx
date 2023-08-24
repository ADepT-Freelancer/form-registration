import React from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../Api/api";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // sessionStorage.removeItem("name");
    // sessionStorage.removeItem("token");
    instance.delete(`auth/login`);
    navigate("/auth");
  };

  return (
    <div>
      This is Home page
      <div>
        <button onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  );
};
