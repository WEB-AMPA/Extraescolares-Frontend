import { useMemo, useCallback, useState, createContext, useContext } from "react";
import PropTypes from "prop-types"

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [auth, setAuthState] = useState({
    isAuth: sessionStorage.getItem("token") ? true : false,
    token: sessionStorage.getItem("token") || null,
    user: sessionStorage.getItem("usernameOrEmail") || null,
    name: sessionStorage.getItem("name") || null,
    role: sessionStorage.getItem("role") || null,
    partnerId: sessionStorage.getItem("partnerId") || null,
  });

  const login = useCallback((token, username, name, role, partnerId) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("usernameOrEmail", username);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("partnerId", partnerId);
    setAuthState({
      isAuth: true,
      token,
      user: username,
      name,
      role,
      partnerId
    });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usernameOrEmail");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("partnerId");
    setAuthState({
      isAuth: false,
      token: null,
      user: null,
      name: null,
      role: null,
      partnerId: null
    });
  }, []);

  const authValue = useMemo(() => ({ auth, login, logout }), [auth, login, logout]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

 AuthContextProvider.propTypes ={
    children: PropTypes.object
  }

export const useAuthContext = () => useContext(AuthContext);
