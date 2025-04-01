// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the user data type
interface User {
  name: string;
  email: string;
  password: string;
}

// Create the context with default values
interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component to manage the context state
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};



// index.tsx or App.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./UserContext"; // Import the UserProvider

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <App />
  </UserProvider>
);



// SignupCard.tsx
import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "../UserContext"; // Import the context
import { useState } from "react";

const validationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignupCard() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access the setUser function from the context

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    setUser({
      name: data.userName,
      email: data.email,
      password: data.password,
    }); // Pass user data to the context
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Box>
      <Card>
        <Typography variant="h5" align="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Username" fullWidth {...register("userName")} />
          <TextField label="Email" fullWidth {...register("email")} />
          <TextField label="Password" fullWidth type="password" {...register("password")} />
          <Button type="submit">Sign Up</Button>
        </form>
      </Card>
    </Box>
  );
}


// Login.tsx
import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Import the context

const Login = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Access the user data from the context

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    if (user?.email === data.email && user?.password === data.password) {
      navigate("/mainpage"); // Redirect to main page if credentials match
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <Box>
      <Card>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Email" fullWidth {...register("email")} />
          <TextField label="Password" fullWidth type="password" {...register("password")} />
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </Box>
  );
};

export default Login;















