export function Logo({ size = "default" }) {
  const sizeClasses = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl"
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`font-black ${sizeClasses[size]} bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent`}>
        LUXORA
      </div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
    </div>
  );
}
