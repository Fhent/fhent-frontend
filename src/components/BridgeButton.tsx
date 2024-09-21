"use client"

import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import useBridgeTokens from "@/hooks/fhenix/useBridgeTokens";

export default function BridgeButton() {
  const { address: account } = useAccount();

  const {
    sendAmount,
    recipientAddress,
    refetchFhenixEncBalance,
    refetchZamaEncBalance,
  } = useContext(AppContext);

  const { onBridge } = useBridgeTokens(
    recipientAddress || account!,
    sendAmount,
    refetchFhenixEncBalance,
    refetchZamaEncBalance,
  );
  return (
    <Button 
      disabled={+sendAmount <= 0}
      onClick={onBridge} 
      className="rounded-[12px] border bg-transparent transition-colors duration-300 hover:bg-primary"
    >
      Bridge
    </Button>
  );
}
