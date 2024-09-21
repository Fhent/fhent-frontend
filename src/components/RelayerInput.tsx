"use client";
import { AppContext } from "@/context/AppContext";
import { Loader2 } from "lucide-react";
import { useContext } from "react";

export default function RelayerInput() {
  const { isFetchingAmount, relayerAddress } = useContext(AppContext);
  return (
    <div className="flex flex-1 flex-col gap-2.5">
      <span className="pl-2 text-xs text-foreground">Filling Relayer</span>
      <div className="flex w-full rounded-[12px] bg-black-light px-2 py-1 pr-2">
        <input
          type="text"
          placeholder="0x..."
          value={relayerAddress}
          disabled={true}
          className="w-full border-none bg-transparent font-mono text-base text-foreground outline-none"
        />
        {isFetchingAmount && (
          <Loader2 className="animate-spin text-foreground" />
        )}
      </div>
    </div>
  );
}
