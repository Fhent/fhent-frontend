import BridgeButton from "./BridgeButton";
import NetworkCard from "./NetworkCard";

export default function BridgeCard() {
  return (
    <div className="flex w-full max-w-[450px] flex-col gap-8 rounded-[28px] border bg-black-dark p-4">
      <h1 className="text-center text-2xl">Transfer</h1>
      <div className="flex flex-col gap-2">
        <div className="relative flex flex-col gap-4">
          <NetworkCard />
          <NetworkCard type="to" />
        </div>
      </div>
      <BridgeButton />
    </div>
  );
}
