import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  createdAt?: string;
}
interface UserContextType {
  users: User[];
  currentUser: User | null;
  addUser: (user: User) => void;
  deleteUser: (email: string) => void;
  updateUserStatus: (email: string, isActive: boolean) => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const storedCurrentUser = localStorage.getItem("currentUser");

    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedCurrentUser) setCurrentUser(JSON.parse(storedCurrentUser));
  }, []);

  const addUser = (user: User) => {
    const userExists = users.some(u => u.email === user.email);
    if (!userExists) {
      const newUser = {
        ...user,
        createdAt: new Date().toLocaleDateString(),
        isActive: true
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const deleteUser = (email: string) => {
    const updatedUsers = users.filter(u => u.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const updateUserStatus = (email: string, isActive: boolean) => {
    const updatedUsers = users.map(user =>
      user.email === email ? { ...user, isActive } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const loginUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, updateUserStatus, currentUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
