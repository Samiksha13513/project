import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./ContextApi/UserContext.tsx"; 

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <App />
  </UserProvider>
);
