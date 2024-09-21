import BalanceCard from "@/components/BalanceCard";
import BridgeCard from "@/components/BridgeCard";
import Stepper from "@/components/Stepper";

export default function Bridge() {
  return (
    <main className="container flex h-full flex-1 flex-col items-center py-20">
      <BridgeCard />
      <Stepper currentStep={3} status="loading"/>
      <BalanceCard />
    </main>
  );
}
