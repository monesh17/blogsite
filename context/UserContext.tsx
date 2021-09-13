import React, {
  useEffect,
  useState,
  ReactNode,
  createContext,
  useContext,
} from 'react';

type authContextType = {
  user: {
    userName?: string;
    password?: string;
    admin?: boolean;
  };
  login: (userName: string, password: string) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

// Create Context object.
export const AuthContext = createContext<authContextType>(
  authContextDefaultValues
);

// Export Provider.
export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(null);

  const login = async (userName, password) => {
    await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true' },
      body: '{ userName, password }',
    });
    setUser({
      userName: userName,
      password: password,
    });
  };

  const logout = async () => {
    await fetch('/api/logout', {
      headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true' },
    });
  };

  const value = {
    user,
    login,
    logout,
  };
  const userFromSession = async () => {
    let response = await fetch('/api/user', {
      headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true' },
    });
    response = await response.json();
    return response;
  };

  useEffect(() => {
    const loggedInUser = async () => {
      const userData:any = await userFromSession();
      console.log('logged in user is ', userData.user);
      setUser(userData.user);
    };
    loggedInUser();
  }, []);

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
