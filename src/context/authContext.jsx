import { useMemo, useCallback, useState, createContext, useContext } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [auth, setAuthState] = useState({
    isAuth: sessionStorage.getItem("token") ? true : false,
    token: sessionStorage.getItem("token") || null,
    user: sessionStorage.getItem("usernameOrEmail") || null,
    name: sessionStorage.getItem("name") || null,
    role: sessionStorage.getItem("role") || null,
  });

  const login = useCallback((token, username, name, role) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("usernameOrEmail", username);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("role", role);
    setAuthState({
      isAuth: true,
      token,
      user: username,
      name,
      role,
    });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usernameOrEmail");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("role");
    setAuthState({
      isAuth: false,
      token: null,
      user: null,
      name: null,
      role: null,
    });
  }, []);

  const authValue = useMemo(() => ({ auth, login, logout }), [auth, login, logout]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
