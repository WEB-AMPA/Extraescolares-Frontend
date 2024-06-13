import { prototype } from "postcss/lib/previous-map";
import { useMemo, useCallback, useState, createContext, useContext } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: sessionStorage.getItem("token") ? true : false,
    token: sessionStorage.getItem("token") || null,
    user: sessionStorage.getItem("usernameOrEmail") || null,
    name:  sessionStorage.getItem("name") || null,
    role: sessionStorage.getItem("role") || null,
  });

  const logout = useCallback(() => {

    console.log("frontend", auth)
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usernameOrEmail");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("name");
   
    setAuth({
      isAuth: false,
      token: null,
      user: null,
      role: null,
      name:null
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
