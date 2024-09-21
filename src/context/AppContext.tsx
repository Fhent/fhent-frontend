import addresses from "@/config/addresses";
import { fhenixHelium, zamaDevnet } from "@/config/chains";
import networks from "@/config/networks";
import useFhenixEncryptedBalance from "@/hooks/fhenix/useEncryptedBalance";
import useZamaEncryptedBalance from "@/hooks/zama/useEncryptedBalance";
import { Network, Token } from "@/types";
import { createContext, useEffect, useState } from "react";
import { isAddress } from "viem";
import { useAccount, useReadContract } from "wagmi";
import fhenixWeerc20Abi from "@/config/abi/FhenixWeerc20";
import zamaWeerc20Abi from "@/config/abi/ZamaWeerc20";

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
  fhenixBalance: 0n,
  zamaBalance: 0n,
  fhenixEncBalance: 0n,
  zamaEncBalance: 0n,
  refetchFhenixBalance: () => {},
  refetchZamaBalance: () => {},
  refetchFhenixEncBalance: () => {},
  refetchZamaEncBalance: () => {},
  refetchFhenixBalanceAll: () => {},
  refetchZamaBalanceAll: () => {},
  refetchAllBalances: () => {},
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

  const { address: account } = useAccount();

  const { data: fhenixBalance, refetch: refetchFhenixBalance } =
    useReadContract({
      address: addresses.fhenixWEERC20 as `0x${string}`,
      abi: fhenixWeerc20Abi,
      functionName: "balanceOf",
      args: [account!],
      query: {
        enabled: isAddress(account || ""),
      },
      chainId: fhenixHelium.chainId,
    });

  const { data: zamaBalance, refetch: refetchZamaBalance } = useReadContract({
    address: addresses.zamaWEERC20 as `0x${string}`,
    abi: zamaWeerc20Abi,
    functionName: "balanceOf",
    args: [account!],
    query: {
      enabled: isAddress(account || ""),
    },
    chainId: zamaDevnet.chainId,
  });

  const { balance: fhenixEncBalance, refetch: refetchFhenixEncBalance } =
    useFhenixEncryptedBalance();
  const { balance: zamaEncBalance, refetch: refetchZamaEncBalance } =
    useZamaEncryptedBalance();

  useEffect(() => {
    if (+sendAmount > 0) {
      setIsFetchingAmount(true);

      setTimeout(() => {
        setIsFetchingAmount(false);
        const newFetchedAmount = +sendAmount * 0.99; // 1% fee
        setFetchedAmount(`${newFetchedAmount}`);
        setRelayerAddress(addresses.relayerAddress);
      }, 3000);
    }
  }, [sendAmount]);

  const refetchFhenixBalanceAll = async () => {
    await refetchFhenixBalance();
    await refetchFhenixEncBalance();
  };

  const refetchZamaBalanceAll = async () => {
    await refetchZamaBalance();
    await refetchZamaEncBalance();
  };

  const refetchAllBalances = async () => {
    await refetchFhenixBalanceAll();
    await refetchZamaBalanceAll();
  };

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
        setRelayerAddress,
        fhenixBalance: fhenixBalance || 0n,
        zamaBalance: zamaBalance || 0n,
        fhenixEncBalance: fhenixEncBalance || 0n,
        zamaEncBalance: zamaEncBalance || 0n,
        refetchFhenixBalance,
        refetchZamaBalance,
        refetchFhenixEncBalance,
        refetchZamaEncBalance,
        refetchFhenixBalanceAll,
        refetchZamaBalanceAll,
        refetchAllBalances,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
