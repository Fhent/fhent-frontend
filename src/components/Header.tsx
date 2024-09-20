export default function Header() {
  return (
    <header className="flex w-full justify-center bg-black-dark shadow-black drop-shadow-lg">
      <div className="container flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          {/* add logo instead of span later */}
          <span className="size-10 bg-red-500" />
        </div>
        <div className="flex gap-8">
          <w3m-button />
        </div>
      </div>
    </header>
  );
}
