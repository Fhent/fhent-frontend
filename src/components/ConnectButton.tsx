"use client";
import { useAccount, useEnsName } from "wagmi";
import { Button } from "./ui/button";
import { WalletIcon } from "lucide-react";
import { formatAddress } from "@/lib/formatters";
import { useAppKit } from "@reown/appkit/react";

interface Props {
  showIcon?: boolean;
  className?: string;
}

export default function ConnectWalletButton({ showIcon }: Props) {
  const { open } = useAppKit();
  const { address: account } = useAccount();
  const { data: ensName } = useEnsName({
    address: account as `0x${string}`,
    chainId: 1,
  });

  return (
    <Button
      onClick={() => open()}
      aria-label="Connect your wallet"
      className="flex items-center gap-1 rounded-full border border-foreground bg-transparent transition-colors duration-300 hover:bg-primary"
    >
      {!account && showIcon && (
        <span className="hidden max-[768px]:inline-flex">
          <WalletIcon className="size-5" />
        </span>
      )}
      {account ? (
        <>
          <WalletIcon className="size-5" />
          {ensName ? <p>{ensName}</p> : <p>{formatAddress(account)}</p>}
        </>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
}
