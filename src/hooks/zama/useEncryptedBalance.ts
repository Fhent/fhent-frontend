import { useCallback, useEffect, useMemo, useState } from "react";
import useZamaClient from "./useZamaClient";
import addresses from "@/config/addresses";
import { useAccount, useReadContract } from "wagmi";
import abi from "@/config/abi/ZamaWeerc20";
import { zamaDevnet } from "@/config/chains";
import { useEthersSigner } from "../ethers/useEthersSigner";
import { useEthersProvider } from "../ethers/useEthersProvider";

const useEncryptedBalance = () => {
  const [balance, setBalance] = useState(0n);
  const { address: account } = useAccount();
  const zamaClient = useZamaClient();
  const signer = useEthersSigner({ chainId: zamaDevnet.chainId });
  const provider = useEthersProvider({ chainId: zamaDevnet.chainId });

  const localStorageKeys = useMemo(
    () => localStorage.getItem("zamaKeys"),
    [account],
  );

  console.log({ zamaClient });

  const { data: encBalance } = useReadContract({
    address: addresses.zamaWEERC20 as `0x${string}`,
    abi: abi,
    functionName: "getEncryptedBalance",
    args: [account!],
    chainId: zamaDevnet.chainId,
    query: {
      enabled: !!account,
    },
  });

  const getEncryptedBalance = useCallback(async () => {
    if (!zamaClient || !account || encBalance === undefined) return;
    console.log("running getEncryptedBalance", localStorageKeys);

    // Check if the user has already signed the public key
    if (
      localStorageKeys &&
      JSON.parse(localStorageKeys) &&
      JSON.parse(localStorageKeys)[account.toLowerCase()]
    ) {
      console.log("found keys in local storage");
      const { publicKey, privateKey, signature } =
        JSON.parse(localStorageKeys)[account.toLowerCase()];
      const userBalance = await zamaClient.reencrypt(
        encBalance, // the encrypted balance
        privateKey, // the private key generated by the dApp
        publicKey, // the public key generated by the dApp
        signature, // the user's signature of the public key
        addresses.zamaWEERC20, // The contract address where the ciphertext is
        account, // The user address where the ciphertext is
      );
      setBalance(userBalance);
      return;
    } else {
      console.log("ran getEncryptedBalance", account, zamaClient, encBalance);
      const { publicKey, privateKey } = zamaClient.generateKeypair();
      console.log({ publicKey, privateKey });

      // Create an EIP712 object for the user to sign.
      const eip712 = zamaClient.createEIP712(publicKey, addresses.zamaWEERC20);

      // Request the user's signature on the public key
      const params = [account, JSON.stringify(eip712)];
      // @ts-expect-error - window.ethereum is not null
      const signature = await window.ethereum.request({
        method: "eth_signTypedData_v4",
        params,
      });

      // Save the keys in local storage
      const currentKeys = localStorageKeys ? JSON.parse(localStorageKeys) : {};
      localStorage.setItem(
        "zamaKeys",
        JSON.stringify({
          ...currentKeys,
          [account.toLowerCase()]: {
            publicKey,
            privateKey,
            signature,
          },
        }),
      );

      console.log({ encBalance });

      // This function will call the gateway and decrypt the received value with the provided private key
      const userBalance = await zamaClient.reencrypt(
        encBalance, // the encrypted balance
        privateKey, // the private key generated by the dApp
        publicKey, // the public key generated by the dApp
        signature, // the user's signature of the public key
        addresses.zamaWEERC20, // The contract address where the ciphertext is
        account, // The user address where the ciphertext is
      );

      console.log({ userBalance });

      setBalance(userBalance);
    }
  }, [account, zamaClient, encBalance, signer, provider, localStorageKeys]);

  useEffect(() => {
    getEncryptedBalance();
  }, [getEncryptedBalance]);

  return { balance, refetch: getEncryptedBalance };
};

export default useEncryptedBalance;
