import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  nationality: string;
  state: string;
  phone: string;
  isHeadOfFamily: boolean;
  familyMembers: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (userData: Partial<User>, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Map<string, { user: User; password: string }>>(new Map());

  const login = (email: string, password: string): boolean => {
    const userData = users.get(email);
    if (userData && userData.password === password) {
      setUser(userData.user);
      return true;
    }
    return false;
  };

  const signup = (userData: Partial<User>, password: string): boolean => {
    if (!userData.email) return false;
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email,
      age: userData.age || 0,
      gender: userData.gender || '',
      nationality: userData.nationality || '',
      state: userData.state || '',
      phone: userData.phone || '',
      isHeadOfFamily: true,
      familyMembers: []
    };

    users.set(userData.email, { user: newUser, password });
    setUsers(new Map(users));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};