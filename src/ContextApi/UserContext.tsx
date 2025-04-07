import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
interface User {
  name: string;
  email: string;
  password: string;
}
interface UserContextType {
  users: User[];  // Now managing an array of users
  addUser: (user: User) => void;
  deleteUser: (email: string) => void;
}
 export const UserContext = createContext<UserContextType | undefined>(undefined);
interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  // Sync with localStorage on initial mount (only once)
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);  // Empty dependency array ensures this runs only once on mount.
  // Add a new user to the list
  const addUser = (user: User) => {
    // Check if user already exists based on email
    const userExists = users.some(existingUser => existingUser.email === user.email);
    if (!userExists) {
      const updatedUsers = [...users, user];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };
  
  // Delete a user by email
  const deleteUser = (email: string) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
  return (
    <UserContext.Provider value={{ users, addUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};




















