import addresses from "@/config/addresses";
import { getPermit, Permission } from "fhenixjs";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import useFhenixClient from "./useFhenixClient";
import abi from "@/config/abi/FhenixWeerc20";
import { useEthersSigner } from "../ethers/useEthersSigner";
import { fhenixHelium } from "@/config/chains";

const useEncryptedBalance = () => {
  const client = useFhenixClient()
  const signer = useEthersSigner({ chainId: fhenixHelium.id })

  const [permission, setPermission] = useState<Permission>();

  useEffect(() => {
    const getPermission = async () => {
      if (!signer?.provider) return;
      const permit = await getPermit(addresses.fhenixWEERC20, signer.provider);
      const permission = client.extractPermitPermission(permit!);
      setPermission(permission);
    }

    getPermission();
  }, [signer?.provider]);

  const { data: encBalance, refetch } = useReadContract({
    // @ts-expect-error - wth
    address: addresses.fhenixWEERC20 as `0x${string}`,
    abi,
    functionName: 'encryptedBalanceOf',
    // @ts-expect-error - permission is not null
    args: [permission!],
    account: signer?.address as `0x${string}`,
    chainId: fhenixHelium.id,
  });

  console.log({ permission, encBalance, signer });

  return { balance: encBalance, permission, refetch };
}

export default useEncryptedBalance;