import React, { useState, useContext, useEffect } from 'react';
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const signin = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4500/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email, password }),
        credentials: 'include', 
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.message || data.error);
      } else {
        setIsLoggedIn(true);
        setUserData({ userId: data.userId, roomId: data.roomId });
        setUserToken(data.token);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userData', JSON.stringify({ userId: data.userId, roomId: data.roomId }));
        localStorage.setItem('userToken', data.token);
        console.log("yes");
      }
    } catch (err) {
      console.log('Signin error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, university) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4500/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email, password, university }),
        credentials: 'include', 
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.message || data.error);
      } else {
        setIsLoggedIn(true);
        setUserData({ userId: data.userId, roomId: data.roomId });
        setUserToken(data.token);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userData', JSON.stringify({ userId: data.userId, roomId: data.roomId }));
        localStorage.setItem('userToken', data.token);
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setIsLoggedIn(false);
    setUserData(null);
    setUserToken(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const loginOnRefresh = () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      setIsLoading(false);
      return;
    }
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const data = JSON.parse(userData);
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(loggedIn);
    setUserData(data);
    setUserToken(token);
    setIsLoading(false);
  };

  useEffect(() => {
    loginOnRefresh();
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    userToken,
    setUserToken,
    signin,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
