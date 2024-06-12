import { useMemo, useCallback, useState, createContext, useContext } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: sessionStorage.getItem("token") ? true : false,
    token: sessionStorage.getItem("token") || null,
    user: sessionStorage.getItem("usernameOrEmail") || null,
    role: sessionStorage.getItem("role") || null,
  });

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usernameOrEmail");
    sessionStorage.removeItem("role");
    setAuth({
      isAuth: false,
      token: null,
      user: null,
      role: null,
    });
  }, []);

  const authValue = useMemo(() => ({ auth, setAuth, logout }), [auth, logout]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
