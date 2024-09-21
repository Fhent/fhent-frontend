import { useCallback } from "react";
import useFhenixClient from "./useFhenixClient";
import { useWalletClient, useWriteContract } from "wagmi";
import abi from "@/config/abi/FhenixWeerc20";
import addresses from "@/config/addresses";
import { Contract } from "ethers";

const useTransferEncrypted = (amount: string, recipient: string) => {
  const client = useFhenixClient()
  const { writeContractAsync } = useWriteContract()
  const { data: wclient } = useWalletClient()

  const handleTransferEncrypted = useCallback(async () => {
    try {
      // @todo: use writeContractAsync instead of ethers.Contract
      const encryptedUint = await client.encrypt_uint64(BigInt(Number(amount) * 10 ** 6));
      // @ts-expect-error - wclient is not null
      const contract = new Contract(addresses.fhenixWEERC20, abi, wclient);
      await contract.transferEncrypted(recipient, encryptedUint);
    } catch (e) {
      console.error(e);
    }

  }, [amount, recipient, client, writeContractAsync])

  return { onTransferEncrypted: handleTransferEncrypted }
}

export default useTransferEncrypted;