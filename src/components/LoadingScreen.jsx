export default function LoadingScreen({ label = "Firing up the oven..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-(--color-char)">
      <div
        className="w-12 h-12 rounded-full border-4 border-(--color-ember)/30 border-t-(--color-ember) animate-spin"
        aria-hidden="true"
      />
      <p className="font-mono text-sm tracking-widest uppercase text-(--color-crust)/70">
        {label}
      </p>
    </div>
  );
}
