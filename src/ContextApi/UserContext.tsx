import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
interface User {
  name: string;
  email: string;
  password: string;
}
interface UserContextType {
  users: User[];  // Now managing an array of users
  addUser: (email: User) => void;
  deleteUser: (email: string) => void;
}
 export const UserContext = createContext<UserContextType | undefined>(undefined);
interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);  
  
  const addUser = (user: User) => {
   
    const userExists = users.some(existingUser => existingUser.email === user.email);
    if (!userExists) {
      const updatedUsers = [...users, user];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };
  const deleteUser = (email: string) => {
   
    const updatedUsers = users.filter(user => user.email !== email); 
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




















