"use client";
import networks from "@/config/networks";
import { Network, Token } from "@/types";
import { createContext, useState } from "react";

export const AppContext = createContext({
  sourceNetwork: networks[0],
  targetNetwork: networks[1],
  sourceToken: networks[0].tokens[0],
  targetToken: networks[1].tokens[0],
  sendAmount: "",
  setSourceNetwork: (network: Network) => {},
  setTargetNetwork: (network: Network) => {},
  setSourceToken: (token: Token) => {},
  setSendAmount: (amount: string) => {},
});

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sourceNetwork, setSourceNetwork] = useState<Network>(networks[0]);
  const [targetNetwork, setTargetNetwork] = useState<Network>(networks[1]);
  const [sourceToken, setSourceToken] = useState<Token>(networks[0].tokens[0]);
  const [sendAmount, setSendAmount] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        sourceNetwork,
        targetNetwork,
        sourceToken: {
          ...sourceToken,
        },
        targetToken: networks[1].tokens[0],
        sendAmount,
        setSourceNetwork,
        setTargetNetwork,
        setSourceToken,
        setSendAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
