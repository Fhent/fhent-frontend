import Image from "next/image";

interface NetworkSelectorProps {
  network: string;
  imageURL: string;
  onSelect?: () => void | undefined;
}

export default function NetworkSelector({
  network,
  imageURL,
  onSelect,
}: NetworkSelectorProps) {
  return (
    <div
      onClick={onSelect}
      className="flex w-20 cursor-pointer flex-col items-center gap-2.5 rounded-xl border border-transparent bg-border-light px-2 py-4"
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
