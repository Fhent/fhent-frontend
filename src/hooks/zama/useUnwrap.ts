import abi from "@/config/abi/ZamaWeerc20"
import addresses from "@/config/addresses"
import { useCallback } from "react"
import { useAccount, useConfig, useSwitchChain } from "wagmi"
import { Contract } from "ethers"
import useZamaClient from "./useZamaClient"
import { getWalletClient } from "wagmi/actions"
import { zamaDevnet } from "@/config/chains"

const useUnwrap = (amount: string, refetchBalance?: () => any) => {
  const zamaClient = useZamaClient()
  const config = useConfig()
  const { address: account, chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()

  const handleUnWrap = useCallback(async () => {
    if (!zamaClient || !account) return;
    let newChainId = chainId
    if (chainId !== zamaDevnet.chainId) {
      const newChain = await switchChainAsync({ chainId: zamaDevnet.chainId })
      newChainId = newChain.id
    }
    const einput = zamaClient.createEncryptedInput(addresses.zamaWEERC20, account).add64(Number(amount) * 10 ** 6).encrypt();

    const walletClient = await getWalletClient(config, { chainId: newChainId })

    // @ts-expect-error - wclient is not null
    const contract = new Contract(addresses.zamaWEERC20, abi, walletClient);
    await contract.unwrap(einput.handles[0], einput.inputProof);

    if (refetchBalance) { setTimeout(async () => await refetchBalance(), 15000) };

  }, [amount, account, config, refetchBalance, zamaClient, chainId, switchChainAsync]);

  return { onUnwrap: handleUnWrap }
}

export default useUnwrap