import { useContext } from "react";
import { State } from "../context/stateContext";

export default function MainDetails() {
  const { name, address, email, phone, website } = useContext(State);

  return (
    <>
      <section className="flex flex-col items-end justify-end">
        <h2 className="font-bold text-3xl uppercase mb-1">{name}</h2>
        <p>{address}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>
          <a href={`https://${website}`} target="_blank">
            {website}
          </a>
        </p>
      </section>
    </>
  );
}
