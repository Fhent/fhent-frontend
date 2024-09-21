import Image from "next/image";

export default function Header() {
  return (
    <header className="flex w-full justify-center bg-black-dark shadow-black drop-shadow-lg">
      <div className="container flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Image
            src="/logo/fhentom-logotype.png"
            alt="fhenton-logo"
            width={200}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <div className="flex gap-8">
          <w3m-button />
        </div>
      </div>
    </header>
  );
}
