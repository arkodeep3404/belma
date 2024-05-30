import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Index from "./components/index";
import Error from "./components/error";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Index />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
