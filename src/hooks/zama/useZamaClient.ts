import { zamaDevnet } from "@/config/chains";
import { createInstance, FhevmInstance, initFhevm } from "fhevmjs";
import { useEffect, useState } from "react";
import { useAccount, useClient, useWalletClient } from "wagmi";

const useZamaClient = () => {
  const { address: account } = useAccount();
  const [client, setClient] = useState<FhevmInstance | null>(null);
  const { data: walletClient } = useWalletClient({ chainId: zamaDevnet.chainId })
  const wagmiClient = useClient({ chainId: zamaDevnet.chainId });

  useEffect(() => {
    const init = async () => {
      await initFhevm(); // Load needed WASM
      const instance = await createInstance({
        network: wagmiClient,
        networkUrl: "https://devnet.zama.ai",
        gatewayUrl: "https://gateway.devnet.zama.ai",

      });

      setClient(instance);
    };

    console.log("zama client: ", client);

    if (account) init();
  }, [
    account,
    // using walletclient instead of wagmiclient, as wagmiclient cannot be used in the hook
    walletClient
  ]);

  return client;
}

export default useZamaClient;