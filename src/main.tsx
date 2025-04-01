// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// )

import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./UserContext"; // Import the UserProvider

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <App />
  </UserProvider>
);
