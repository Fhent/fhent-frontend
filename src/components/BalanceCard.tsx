"use client";

import { useContext, useState } from "react";
import { Button } from "./ui/button";
import useFhenixWrap from "@/hooks/fhenix/useWrap";
import useFhenixUnwrap from "@/hooks/fhenix/useUnwrap";
import useZamaWrap from "@/hooks/zama/useWrap";
import useZamaUnwrap from "@/hooks/zama/useUnwrap";
import { AppContext } from "@/context/AppContext";

const initialInputState = {
  zama_wrap_amount: "0",
  zama_unwrap_amount: "0",
  fhenix_wrap_amount: "0",
  fhenix_unwrap_amount: "0",
};

export default function BalanceCard() {
  const [amounts, setAmounts] = useState(initialInputState);
  const {
    fhenixBalance,
    fhenixEncBalance,
    zamaBalance,
    zamaEncBalance,
    refetchFhenixBalanceAll,
    refetchZamaBalanceAll,
    refetchAllBalances,
    refetchZamaEncBalance
  } = useContext(AppContext);

  const { onWrap: onFhenixWrap } = useFhenixWrap(
    amounts.fhenix_wrap_amount,
    refetchFhenixBalanceAll,
  );
  const { onUnwrap: onFhenixUnwrap } = useFhenixUnwrap(
    amounts.fhenix_unwrap_amount,
    refetchFhenixBalanceAll,
  );
  const { onWrap: onZamaWrap } = useZamaWrap(
    amounts.zama_wrap_amount,
    refetchZamaBalanceAll,
  );
  const { onUnwrap: onZamaUnwrap } = useZamaUnwrap(
    amounts.zama_unwrap_amount,
    refetchZamaBalanceAll,
  );

  const fhenixEncBalanceFormatted = fhenixEncBalance
    ? Number(fhenixEncBalance) / 1e6
    : 0;
  const zamaEncBalanceFormatted = zamaEncBalance
    ? Number(zamaEncBalance) / 1e6
    : 0;

  const fhenixBalanceFormatted = fhenixBalance
    ? Number(fhenixBalance) / 1e18
    : 0;
  const zamaBalanceFormatted = zamaBalance ? Number(zamaBalance) / 1e18 : 0;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmounts({
      ...amounts,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-4 grid w-full max-w-[450px] grid-cols-2 gap-4 rounded-[28px] border border-border-light bg-black-dark p-4">
      <div className="flex flex-col gap-2 text-xs">
        <h3 className="text-xl">Fhenix</h3>
        <p>ERC20 balance: {fhenixBalanceFormatted}</p>
        <p>Encrypted ERC20 balance: {fhenixEncBalanceFormatted}</p>
        <div className="grid grid-cols-6 gap-2">
          <input
            name="fhenix_wrap_amount"
            className="text col-span-4 rounded-[12px] bg-black-light px-2 py-1 font-mono text-lg outline-none"
            placeholder="0"
            onChange={onChange}
          />
          <Button
            onClick={onFhenixWrap}
            className="col-span-2 rounded-[12px] text-xs"
          >
            Wrap
          </Button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <input
            name="fhenix_unwrap_amount"
            className="col-span-4 rounded-[12px] bg-black-light px-2 py-1 font-mono text-lg outline-none"
            placeholder="0"
            onChange={onChange}
          />
          <Button
            onClick={onFhenixUnwrap}
            className="col-span-2 rounded-[12px] text-xs"
          >
            Unwrap
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-xs">
        <h3 className="text-xl">Zama</h3>
        <p>ERC20 balance: {zamaBalanceFormatted}</p>
        <p>Encrypted ERC20 balance: {zamaEncBalanceFormatted} </p>
        <div className="grid grid-cols-6 gap-2">
          <input
            name="zama_wrap_amount"
            className="col-span-4 rounded-[12px] bg-black-light px-2 py-1 font-mono text-lg outline-none"
            placeholder="0"
            onChange={onChange}
          />
          <Button
            className="col-span-2 rounded-[12px] text-xs"
            onClick={onZamaWrap}
          >
            Wrap
          </Button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <input
            name="zama_unwrap_amount"
            className="col-span-4 rounded-[12px] bg-black-light px-2 py-1 font-mono text-lg outline-none"
            placeholder="0"
            onChange={onChange}
          />
          <Button
            className="col-span-2 rounded-[12px] text-xs"
            onClick={onZamaUnwrap}
          >
            Unwrap
          </Button>
        </div>
      </div>
      <Button
        onClick={refetchAllBalances}
        className="col-span-2 rounded-[12px] text-xs"
      >
        Refetch
      </Button>
    </div>
  );
}
