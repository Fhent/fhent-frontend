import { useCallback } from "react";
import useFhenixClient from "./useFhenixClient";
import { useAccount, useConfig, useSwitchChain } from "wagmi";
import addresses from "@/config/addresses";
import abi from "@/config/abi/FhenixBridge";
import { SEAL } from "@/config";
import { Contract } from "ethers";
import { fhenixHelium } from "@/config/chains";
import { getWalletClient } from "wagmi/actions";

const useBridgeTokens = (to: `0x${string}`, amount: string, refetchSourceBalance?: () => any, refetchTargetBalance?: () => any) => {
  const fhenixClient = useFhenixClient();
  const config = useConfig()
  const { chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()

  const handleBridgeTokens = useCallback(async () => {
    let newChainId = chainId
    if (chainId !== fhenixHelium.id) {
      const newChain = await switchChainAsync({ chainId: fhenixHelium.id })
      newChainId = newChain.id
    }

    const encryptedTo = await fhenixClient.encrypt_address(to);
    const encryptedAmount = await fhenixClient.encrypt_uint64(BigInt(Number(amount) * 10 ** 6));

    const walletClient = await getWalletClient(config, { chainId: newChainId })

    // @ts-expect-error - wclient is not null
    const contract = new Contract(addresses.fhenixBridge, abi, walletClient);
    await contract.bridgeWEERC20(encryptedTo, encryptedAmount, addresses.relayerAddress, SEAL);

    if (refetchSourceBalance) { setTimeout(async () => await refetchSourceBalance(), 5000) };
    if (refetchTargetBalance) { setTimeout(async () => await refetchTargetBalance(), 30000) };
  }, [to, amount, fhenixClient, config, chainId, switchChainAsync, refetchSourceBalance]);

  return {
    onBridge: handleBridgeTokens,
  };
};

export default useBridgeTokens;
