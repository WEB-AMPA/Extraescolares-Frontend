import { useMemo } from "react"
import { useContext } from "react"
import { useCallback } from "react"
import { useState, createContext } from "react"

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(sessionStorage.getItem('') ?? false)

  const login = useCallback(({user}) => {

    sessionStorage.setItem({user}, true)
    setIsAuth(true)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('')
    setIsAuth(false)
  }, [])

  const auth = useMemo(
    () => ({ isAuth, login, logout, }),
    [isAuth, login, logout])


  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuthContext = () => useContext(AuthContext)