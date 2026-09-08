import { cn } from "@/lib/cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-8 w-8 animate-spin rounded-full border-2 border-sand border-t-burgundy",
        className,
      )}
      aria-hidden
    />
  );
}

export function LoadingScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-cream">
      <Spinner className="h-10 w-10" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export function ErrorBanner({
  title = "Something went wrong",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-crimson/25 bg-blush px-4 py-4 text-sm sm:px-5"
    >
      <p className="font-semibold text-burgundy">{title}</p>
      <p className="mt-1 leading-relaxed text-crimson">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-sm font-semibold text-burgundy underline decoration-crimson/40 underline-offset-4"
        >
          Try again
        </button>
      )}
    </div>
  );
}
