import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn("text-[var(--ink)]", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path d="M50 10C55.5228 10 60 14.4772 60 20V48C60 53.5228 55.5228 58 50 58C44.4772 58 40 53.5228 40 48V20C40 14.4772 44.4772 10 50 10Z" />
        <path
          d="M50 10C55.5228 10 60 14.4772 60 20V48C60 53.5228 55.5228 58 50 58C44.4772 58 40 53.5228 40 48V20C40 14.4772 44.4772 10 50 10Z"
          transform="rotate(120 50 50)"
        />
        <path
          d="M50 10C55.5228 10 60 14.4772 60 20V48C60 53.5228 55.5228 58 50 58C44.4772 58 40 53.5228 40 48V20C40 14.4772 44.4772 10 50 10Z"
          transform="rotate(240 50 50)"
        />
        <circle cx="50" cy="50" r="8" />
      </g>
    </svg>
  );
}
