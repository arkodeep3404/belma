import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/auth";
import StateContext from "./context/stateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <StateContext>
      <App />
    </StateContext>
  </AuthContextProvider>
);
