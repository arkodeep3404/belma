import { useContext } from "react";
import { State } from "../context/stateContext";
import qr from "../context/qr.jpg";

export default function Footer() {
  const { name, email, website, phone, bankAccount, bankName } =
    useContext(State);

  return (
    <>
      <footer className="footer flex justify-between border-t-2 border-gray-300 pt-5">
        <ul className="flex flex-col flex-wrap justify-center">
          <li>
            <span className="font-bold">Bank:</span> {bankName}
          </li>
          <li>
            <span className="font-bold">Account holder:</span> {name}
          </li>
          <li>
            <span className="font-bold">Account number:</span> {bankAccount}
          </li>
        </ul>
        <img src={qr} alt=""></img>
      </footer>

      <p className="text-center px-5 mt-8 text-xs ">
        Built by{" "}
        <a
          href="https://arkodeepchatterjee.tech"
          target="_blank"
          className="underline"
        >
          Arkodeep Chatterjee
        </a>
      </p>
    </>
  );
}
