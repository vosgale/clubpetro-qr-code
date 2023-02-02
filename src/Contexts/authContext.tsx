import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { ILoginForm } from "../Components/Forms/types";
import api from "../Services/api";

interface IAuthContextData {
  signed: boolean;
  isLoading: boolean;
  Login(values: ILoginForm): Promise<void>;
  logOut: () => void;
  user?: IUser;
  setSession: (sessionName: string) => void;
  destroySession: () => void;
  currentSessionName: string | null;
}
interface IUser {
  cellphone: string;
  document: string;
  email: string;
  exp: number;
  iat: number;
  id: string;
  isAdmin: boolean;
  name: string;
}
const AuthContext = createContext({} as IAuthContextData);
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
export const AuthProvider = ({ children }: any) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [currentAcessToken, setCurrentAcessToken] = useState<string | null>(
    window.localStorage.getItem("accessToken")
  );
  const [currentSessionName, setCurrentSessionName] = useState<string | null>(
    window.localStorage.getItem("session-name")
  );

  const isValidToken = () => {
    if (!currentAcessToken) {
      return false;
    }

    const decoded = jwtDecode(currentAcessToken) as IUser;
    const currentTime = Date.now() / 1000;

    setUser(decoded);

    return decoded.exp > currentTime;
  };

  const setAuth = (accessToken: string | undefined) => {
    setIsLoading(true);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      setCurrentAcessToken(accessToken);
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      setAuthenticated(true);
      setIsLoading(false);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("session-name");
      setCurrentSessionName(null);
      setCurrentAcessToken(null);
      setAuthenticated(false);
      setIsLoading(false);
    }
  };
  async function Login(values: ILoginForm) {
    try {
      const response = await api.post("/auth/login", {
        ...values,
      });
      setAuth(response.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  }
  const loadUser = () => {
    setIsLoading(true);
    if (isValidToken()) {
      setAuthenticated(true);
      api.defaults.headers.Authorization = `Bearer ${currentAcessToken}`;
      setIsLoading(false);
    } else {
      setAuthenticated(false);
      setIsLoading(false);
    }
  };
  const logOut = () => {
    setAuth(undefined);
  };
  const setSession = async (sessionName: string) => {
    try {
      const response = await api.post("/robot/create", {
        sessionName,
      });
      localStorage.setItem("session-name", response.data.sessionName);
      setCurrentSessionName(sessionName);
    } catch (error) {
      console.log("error");
    }
  };
  const destroySession = () => {
    setCurrentSessionName(null);
    localStorage.removeItem("session-name");
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAcessToken]);

  return (
    <AuthContext.Provider
      value={{
        signed: authenticated,
        Login,
        isLoading,
        user,
        logOut,
        setSession,
        destroySession,
        currentSessionName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
