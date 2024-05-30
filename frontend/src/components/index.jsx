import { useContext } from "react";
import { State } from "../context/stateContext";
import { Navigate } from "react-router-dom";

export default function Index() {
  const { user } = useContext(State);

  if (user === null) {
    return <Navigate to={"/signin"} />;
  }

  return <Navigate to={"/home"} />;
}
