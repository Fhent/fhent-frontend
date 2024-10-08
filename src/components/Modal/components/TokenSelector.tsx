"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Network, Token } from "@/types";
import { Search } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { AppContext, AppContextType } from "@/context/AppContext";

interface TokenCardProps {
  network: Network;
  token: Token;
  isSelected?: boolean;
  onSelect?: () => void;
}

const TokenCard = ({
  network,
  token,
  onSelect,
  isSelected = false,
}: TokenCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`my-3 flex cursor-pointer items-center justify-between rounded-xl border px-2.5 py-3 text-xs ${
        isSelected
          ? "border-[#ff6600]/50 bg-[#ff6600]/5"
          : "border-transparent bg-border-light"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="relative flex size-8 items-center justify-center rounded-full bg-foreground">
          <Image
            src={`/symbols/${token.icon}`}
            alt="ethereum-logo"
            width={16}
            height={16}
            className="size-6"
          />
          <div
            className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border"
            style={{ background: network.color }}
          >
            <Image
              src={`/symbols/${network.icon}`}
              alt="optimism-logo"
              width={16}
              height={16}
              className="size-3"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 text-xs">
          <p>{token.symbol}</p>
          <p>{network.name}</p>
        </div>
      </div>
      <span className="font-mono text-base">1,301.49</span>
    </div>
  );
};

export default function TokenSelector({
  destination,
}: {
  destination: string;
}) {
  const {
    sourceNetwork,
    targetNetwork,
    sourceToken,
    targetToken,
    setSourceToken,
    setTargetToken,
  } = useContext<AppContextType>(AppContext);

  const selectedNetwork =
    destination === "from" ? sourceNetwork : targetNetwork;

  const selectedToken = destination === "from" ? sourceToken : targetToken;

  const handleTokenSelect = (token: Token) => {
    if (destination === "from") {
      setSourceToken(token);
    } else {
      setTargetToken(token);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="mx-2 flex justify-between rounded-xl border bg-transparent px-2.5 py-3 text-xs">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none"
        />
        <Search size={16} className="" />
      </div>

      <ScrollArea className="h-52 px-2">
        {selectedNetwork.tokens.map((token, index) => (
          <TokenCard
            key={index}
            network={selectedNetwork}
            token={token}
            isSelected={selectedToken.symbol === token.symbol}
            onSelect={() => handleTokenSelect(token)}
          />
        ))}
        <ScrollBar orientation="vertical" className="w-1 border-none" />
      </ScrollArea>
    </div>
  );
}
