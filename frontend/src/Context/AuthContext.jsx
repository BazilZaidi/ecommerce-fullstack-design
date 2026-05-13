import { createContext, useState, useContext } from 'react';

// Create the context (like creating the announcement channel)
const AuthContext = createContext();

// Provider wraps your whole app and shares the data
export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth anywhere in your app
export function useAuth() {
  return useContext(AuthContext);
}