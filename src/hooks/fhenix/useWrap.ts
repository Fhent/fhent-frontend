import abi from "@/config/abi/FhenixWeerc20"
import addresses from "@/config/addresses"
import { fhenixHelium } from "@/config/chains"
import { useCallback } from "react"
import { useAccount, useConfig, useSwitchChain, useWriteContract } from "wagmi"
import { waitForTransactionReceipt } from "wagmi/actions"

const useWrap = (amount: string, refetchBalance?: () => any) => {
  const { writeContractAsync } = useWriteContract()
  const config = useConfig()
  const { chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()

  const handleWrap = useCallback(async () => {
    let newChainId = chainId
    if (chainId !== fhenixHelium.chainId) {
      const newChain = await switchChainAsync({ chainId: fhenixHelium.chainId })
      newChainId = newChain.id
    }

    const hash = await writeContractAsync({
      abi,
      address: addresses.fhenixWEERC20 as `0x${string}`,
      functionName: 'wrap',
      args: [BigInt(amount) * BigInt(10 ** 18)],
      chainId: newChainId,
    })

    const receipt = await waitForTransactionReceipt(config, { hash });

    if (refetchBalance) await refetchBalance();

    return receipt
  }, [amount, writeContractAsync, config, refetchBalance, chainId, switchChainAsync])

  return { onWrap: handleWrap }
}

export default useWrap