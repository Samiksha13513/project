import ReactDOM from "react-dom/client";
import store from './redux/store.ts'; 
import { Provider } from 'react-redux';
import App from './App';
import { UserProvider } from "./ContextApi/UserContext.tsx"; 

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
  <UserProvider>
    <App />
  </UserProvider>
  </Provider>
);
