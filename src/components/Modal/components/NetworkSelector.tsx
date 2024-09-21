import Image from "next/image";

interface NetworkSelectorProps {
  network: string;
  imageURL: string;
  isSelected?: boolean;

  onSelect?: () => void | undefined;
}

export default function NetworkSelector({
  network,
  imageURL,
  isSelected = false,
  onSelect,
}: NetworkSelectorProps) {
  return (
    <div
      onClick={onSelect}
      className={`flex w-20 cursor-pointer flex-col items-center gap-2.5 rounded-xl border px-2 py-4 ${
        isSelected
          ? "border-[#ff6600]/50 bg-[#ff6600]/5"
          : "border-transparent bg-border-light"
      }`}
    >
      <div className="flex size-7 items-center justify-center overflow-hidden rounded-full bg-foreground">
        <Image
          src={`/symbols/${imageURL}`}
          alt={`${network}-logo`}
          width={24}
          height={24}
          className="size-6"
        />
      </div>
      <span className="text-xs capitalize">{network}</span>
    </div>
  );
}
