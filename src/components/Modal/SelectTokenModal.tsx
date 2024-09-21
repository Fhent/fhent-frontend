"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import NetworkSelector from "./components/NetworkSelector";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import TokenSelector from "./components/TokenSelector";
import { Button } from "../ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import networks from "@/config/networks";
import type { Network, Token } from "@/types";
import { AppContext, AppContextType } from "@/context/AppContext";

interface NetworkSelectorProps {
  network: Network;
  token: Token;
  destination: string;
}

export default function SelectTokenModal({
  network,
  token,
  destination,
}: NetworkSelectorProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<null | string>(null);

  const { setSourceNetwork, setTargetNetwork } =
    useContext<AppContextType>(AppContext);

  const handleNetworkSelect = (network: Network): void => {
    setSelectedNetwork(network.name);
    setSourceNetwork(network);
    setTargetNetwork(networks[1 - networks.findIndex((n) => n === network)]);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"plain"}
          size={"plain"}
          className="flex w-full max-w-36 items-center justify-between gap-8 rounded-[4px] bg-border-light p-2"
        >
          <div className="flex items-center gap-2">
            <div className="relative flex size-10 items-center justify-center rounded-full bg-foreground">
              <Image
                src={`/symbols/${token.icon}`}
                alt={`${token.symbol}-logo`}
                width={16}
                height={16}
                className="size-8"
              />
              <div className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border bg-foreground">
                <Image
                  src={`/symbols/${network.icon}`}
                  alt={`${network.name}-logo`}
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
          <ChevronDown size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex w-full flex-col gap-8 rounded-[28px] border bg-black-dark p-2 sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="self-start px-2 pt-2 text-center text-2xl font-normal">
            Select a Token
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2 overflow-hidden px-2">
          <h2 className="text-sm">Networks</h2>
          <ScrollArea>
            <div className="flex w-max gap-2 pb-3">
              {networks.map(({ name, icon }, index) => (
                <NetworkSelector
                  key={index}
                  network={name}
                  imageURL={icon}
                  isSelected={selectedNetwork === name}
                  onSelect={() => handleNetworkSelect(networks[index])}
                />
              ))}
            </div>
            <ScrollBar
              orientation="horizontal"
              className="h-1.5 border-none bg-border-light"
            />
          </ScrollArea>
        </div>
        <TokenSelector destination={destination} />
      </DialogContent>
    </Dialog>
  );
}
