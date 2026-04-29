import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const demoUsers = {
  admin: {
    name: 'Admin Ayesha',
    email: 'admin@pawfectmatch.com',
    role: 'admin',
  },
  adopter: {
    name: 'Sakib Hossain',
    email: 'adopter@pawfectmatch.com',
    role: 'adopter',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pawfect-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pawfect-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pawfect-user');
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login: (mode = 'adopter') => setUser(demoUsers[mode] || demoUsers.adopter),
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
