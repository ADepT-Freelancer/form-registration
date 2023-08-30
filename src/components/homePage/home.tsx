import { useNavigate } from "react-router-dom";
import { authAPI } from "../../Api/auth-api";
import { useEffect } from "react";

export const HomePage = () => {
  useEffect(() => {
    document.title = "Home page";
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    authAPI.logout();
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
