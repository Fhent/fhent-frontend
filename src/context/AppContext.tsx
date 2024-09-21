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
  recipientAddress: "" as `0x${string}` | "",
  setRecipientAddress: (address: `0x${string}` | "") => {},
  isFetchingAmount: false,
  setIsFetchingAmount: (isFetching: boolean) => {},
  fetchedAmount: "",
  setFetchedAmount: (amount: string) => {},
  relayerAddress: "",
  setRelayerAddress: (address: string) => {},
});

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sourceNetwork, setSourceNetwork] = useState<Network>(networks[0]);
  const [targetNetwork, setTargetNetwork] = useState<Network>(networks[1]);
  const [sourceToken, setSourceToken] = useState<Token>(networks[0].tokens[0]);
  const [recipientAddress, setRecipientAddress] = useState<`0x${string}` | "">(
    "",
  );
  const [sendAmount, setSendAmount] = useState<string>("");
  const [isFetchingAmount, setIsFetchingAmount] = useState<boolean>(false);
  const [fetchedAmount, setFetchedAmount] = useState<string>("");
  const [relayerAddress, setRelayerAddress] = useState("");

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
        recipientAddress,
        setRecipientAddress,
        isFetchingAmount,
        setIsFetchingAmount,
        fetchedAmount,
        setFetchedAmount,
        relayerAddress,
        setRelayerAddress
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
