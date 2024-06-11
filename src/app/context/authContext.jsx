import { useMemo } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useState, createContext } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: sessionStorage.getItem("token") ? true : false,
    token: sessionStorage.getItem("token") || null,
    user: sessionStorage.getItem("user") || null,
    role: sessionStorage.getItem("role") || null,
  });

  const login = useCallback(async ({ username, password }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      const { token, role } = response.data;
      // const navigate = useNavigate();
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", username);
      sessionStorage.setItem("role", role);
      console.log(response.data);
      console.log("IN!");
      // window.navigator("/intranet", { replace: true });

      setAuth({
        isAuth: true,
        token,
        user: username,
        role,
      });
      console.log(auth);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    setAuth({
      isAuth: false,
      token: null,
      user: null,
      role: null,
    });
  }, []);

  // const authValue = useMemo(
  //   () => ({ ...auth, login, logout }),
  //   [auth, login, logout]
  // );

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
