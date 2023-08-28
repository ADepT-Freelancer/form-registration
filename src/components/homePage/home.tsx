import { useNavigate } from "react-router-dom";
import { authAPI } from "../../Api/auth-api";

export const HomePage = () => {
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
