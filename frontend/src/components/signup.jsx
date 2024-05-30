import BottomWarning from "../context/bottomWarning";
import Button from "../context/button";
import Heading from "../context/heading";
import InputBox from "../context/inputBox";
import SubHeading from "../context/subHeading";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { State } from "../context/stateContext";
import { account, ID } from "../context/appwrite";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, setUser } = useContext(State);
  const navigate = useNavigate();

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (user !== null) {
    return <Navigate to={"/home"} />;
  }

  async function Signup() {
    try {
      await account.create(ID.unique(), email, password, name);
      alert("account created. please signin");
      navigate("/signin");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="John Doe"
            label={"Full Name"}
          />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={Signup} label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}
