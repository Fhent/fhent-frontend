import abi from "@/config/abi/FhenixWeerc20"
import addresses from "@/config/addresses"
import { useCallback } from "react"
import { useAccount, useConfig, useSwitchChain } from "wagmi"
import useFhenixClient from "./useFhenixClient"
import { Contract } from "ethers"
import { fhenixHelium } from "@/config/chains"
import { getWalletClient } from "wagmi/actions"

const useUnwrap = (amount: string, refetchBalance?: () => any) => {
  const fhenixClient = useFhenixClient()
  const config = useConfig()
  const { switchChainAsync } = useSwitchChain();
  const { chainId } = useAccount()

  const handleUnWrap = useCallback(async () => {
    let newChainId = chainId
    if (chainId !== fhenixHelium.chainId) {
      const newChain = await switchChainAsync({ chainId: fhenixHelium.chainId })
      newChainId = newChain.id
    }
    const encryptedAmount = await fhenixClient.encrypt_uint64(BigInt(Number(amount) * 10 ** 6))

    const walletClient = await getWalletClient(config, { chainId: newChainId })

    // @ts-expect-error - wclient is not null
    const contract = new Contract(addresses.fhenixWEERC20, abi, walletClient);
    await contract.unwrap(encryptedAmount);

    if (refetchBalance) { setTimeout(async () => await refetchBalance(), 5000) };

  }, [amount, config, refetchBalance, fhenixClient, chainId, switchChainAsync]);

  return { onUnwrap: handleUnWrap }
}

export default useUnwrap