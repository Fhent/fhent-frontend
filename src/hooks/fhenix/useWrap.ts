import abi from "@/config/abi/FhenixWeerc20"
import addresses from "@/config/addresses"
import { useCallback } from "react"
import { useConfig, useWriteContract } from "wagmi"
import { waitForTransactionReceipt } from "wagmi/actions"

const useWrap = (amount: string, refetchBalance?: () => any) => {
  const { writeContractAsync } = useWriteContract()
  const config = useConfig()

  const handleWrap = useCallback(async () => {
    const hash = await writeContractAsync({
      abi,
      address: addresses.fhenixWEERC20 as `0x${string}`,
      functionName: 'wrap',
      args: [BigInt(amount) * BigInt(10 ** 18)],
    })

    const receipt = await waitForTransactionReceipt(config, { hash });

    if (refetchBalance) await refetchBalance();

    return receipt
  }, [amount, writeContractAsync, config, refetchBalance])

  return { onWrap: handleWrap }
}

export default useWrap