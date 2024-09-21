import Image from "next/image";

interface NetworkSelectorProps {
  network: string;
  imageURL: string;
  color?: string;
  isSelected?: boolean;
  supported: boolean;
  onSelect?: () => void | undefined;
}

export default function NetworkSelector({
  network,
  imageURL,
  color,
  isSelected = false,
  supported,
  onSelect,
}: NetworkSelectorProps) {
  return (
    <div
      onClick={supported ? onSelect : undefined}
      className={`flex w-20 cursor-pointer flex-col items-center gap-2.5 rounded-xl border px-2 py-4 ${
        supported ? isSelected
          ? "border-[#ff6600]/50 bg-[#ff6600]/5"
          : "border-transparent bg-border-light"
          : "opacity-50"
      }`}
    >
      <div
        className={`flex size-7 items-center justify-center overflow-hidden rounded-full`}
        style={{ backgroundColor: color }}
      >
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
