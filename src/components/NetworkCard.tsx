import networks from "@/config/networks";
import SelectTokenModal from "./Modal/SelectTokenModal";

interface NetworkCardProps {
  type?: "from" | "to";
}

export default function NetworkCard({ type = "from" }: NetworkCardProps) {
  return (
    <div className={`flex flex-col gap-2 rounded-[12px] border p-2`}>
      <div className="flex">
        <div className="flex flex-1 flex-col gap-2.5">
          <span className="text-xs">{type === "to" ? "Receive:" : "Pay:"}</span>
          <div className="flex pr-2">
            <input
              type="text"
              placeholder="0.0"
              className="w-full border-none bg-transparent font-mono text-lg outline-none"
            />
          </div>
        </div>
        <SelectTokenModal network={networks[0]} token={networks[0].tokens[0]} />
      </div>
    </div>
  );
}
