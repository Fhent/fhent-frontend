"use client";
import networks from "@/config/networks";
import SelectTokenModal from "./Modal/SelectTokenModal";
import { ChangeEvent, useContext } from "react";
import { AppContext } from "@/context/AppContext";

interface NetworkCardProps {
  type?: "from" | "to";
}

export default function NetworkCard({ type = "from" }: NetworkCardProps) {
  const { sendAmount, setSendAmount } = useContext(AppContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/^0+(?=\d)/, "");
    setSendAmount(newValue);
  };

  return (
    <div className={`flex flex-col gap-2 rounded-[12px] border p-2`}>
      <div className="flex">
        <div className="flex flex-1 flex-col gap-2.5">
          <span className="text-xs">{type === "to" ? "Receive:" : "Pay:"}</span>
          <div className="flex pr-2">
            <input
              type="text"
              placeholder="0.0"
              disabled={type === "to"}
              value={type === "to" ? "" : sendAmount}
              onChange={handleInputChange}
              className="w-full border-none bg-transparent font-mono text-lg outline-none"
            />
          </div>
        </div>
        <SelectTokenModal network={networks[0]} token={networks[0].tokens[0]} />
      </div>
    </div>
  );
}
