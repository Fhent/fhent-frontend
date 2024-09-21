"use client";
import networks from "@/config/networks";
import SelectTokenModal from "./Modal/SelectTokenModal";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useAccount } from "wagmi";
import { isAddress } from "viem";
import { Loader2, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

interface NetworkCardProps {
  type?: "from" | "to";
}

const inputStatus = {
  default: 0,
  valid: 1,
  invalid: 2,
};

export default function NetworkCard({ type = "from" }: NetworkCardProps) {
  const {
    setRecipientAddress,
    setSendAmount,
    recipientAddress,
    sendAmount,
    targetNetwork,
    targetToken,
    sourceNetwork,
    sourceToken,
  } = useContext(AppContext);

  const [isRecipientAddressInputOpen, setIsRecipientAddressInputOpen] =
    useState(false);
  const [isRecipientAddressValid, setIsRecipientAddressValid] = useState(
    inputStatus.default,
  );
  const [loading, setLoading] = useState(false);
  const { address: account } = useAccount();
  const recipientAddressRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/^0+(?=\d)/, "");
    setSendAmount(newValue);
  };

  const onCancelRecipientAddress = () => {
    setIsRecipientAddressInputOpen(false);
    setRecipientAddress("");
  };

  useEffect(() => {
    if (isRecipientAddressInputOpen) {
      recipientAddressRef.current?.focus();
    }
  }, [isRecipientAddressInputOpen]);

  useEffect(() => {
    if (recipientAddress.length === 42) {
      if (isAddress(recipientAddress)) {
        setIsRecipientAddressValid(inputStatus.valid);
      } else {
        setIsRecipientAddressValid(inputStatus.invalid);
      }
    } else if (recipientAddress.length > 0) {
      setIsRecipientAddressValid(inputStatus.invalid);
    } else {
      setIsRecipientAddressValid(inputStatus.default);
    }
  }, [recipientAddress]);

  return (
    <div className={`flex flex-col gap-2 rounded-[12px] border p-2`}>
      <div className="flex">
        <div className="flex flex-1 flex-col gap-2.5">
          <span className="text-xs">{type === "to" ? "Receive:" : "Pay:"}</span>
          <div className="flex pr-2">
            <input
              type="text"
              placeholder="0.0"
              disabled={type === "to"}
              value={type === "to" ? "" : sendAmount}
              onChange={handleInputChange}
              className="w-full border-none bg-transparent font-mono text-lg outline-none"
            />
            {type === "to" && loading && <Loader2 className="animate-spin" />}
          </div>
        </div>
        <SelectTokenModal
          network={type === "to" ? targetNetwork : sourceNetwork}
          token={type === "to" ? targetToken : sourceToken}
        />
      </div>

      {type === "to" && isRecipientAddressInputOpen ? (
        <div
          className={`max-xs:gap-1 max-xs:text-xs flex items-center justify-between gap-2 rounded-[6px] bg-[#171721] px-2 text-sm transition-colors duration-300 text-[#7d69ff]${isRecipientAddressValid === inputStatus.default ? "border-white/10 bg-black/20 focus-visible:border-white/20" : isRecipientAddressValid === inputStatus.valid ? "border-green-400/30 bg-green-400/5 focus-visible:border-green-400/50" : "border-red-400/30 bg-red-400/10 focus-visible:border-red-400/50"} `}
        >
          <span className="flex w-fit text-nowrap bg-clip-text">Send to:</span>
          <input
            ref={recipientAddressRef}
            type="text"
            placeholder="Recipient address"
            value={recipientAddress}
            maxLength={42}
            onChange={(e) =>
              setRecipientAddress(e.target.value as `0x${string}`)
            }
            className="placeholder-text-white/50 flex-1 bg-transparent font-mono text-xs font-medium leading-6 text-white/70 focus:outline-none"
          />
          <Button
            onClick={onCancelRecipientAddress}
            variant={"ghost"}
            className="max-xs:text-xs flex rounded-[6px] bg-clip-text p-0 text-sm"
            aria-label="Click to cancel recipient address input"
          >
            Cancel
          </Button>
        </div>
      ) : type === "to" ? (
        <div className="flex items-center justify-center gap-2 rounded-[8px] bg-border-light">
          <Button
            onClick={
              account ? () => setIsRecipientAddressInputOpen(true) : () => {}
            }
            variant={"ghost"}
            disabled={!account}
            className="w-full gap-2 rounded-md p-0 hover:bg-primary hover:text-foreground"
            aria-label="Click to add recipient address"
          >
            <div className="flex size-6 items-center justify-center rounded-full bg-black-light">
              <PlusIcon className="size-4" />
            </div>
            Add recipient address
          </Button>
        </div>
      ) : null}
    </div>
  );
}
