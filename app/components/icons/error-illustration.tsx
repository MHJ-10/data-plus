import { cn } from "@/utils";

const ErrorIllustrationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mx-auto", className)}
    >
      {/* Background circles */}
      <circle
        cx="140"
        cy="140"
        r="110"
        fill="url(#errorGradient1)"
        opacity="0.08"
      />
      <circle
        cx="140"
        cy="140"
        r="80"
        fill="url(#errorGradient2)"
        opacity="0.12"
      />

      {/* Alert triangle */}
      <path
        d="M140 70 L190 160 L90 160 Z"
        fill="none"
        stroke="url(#errorGradient3)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
      />

      {/* Exclamation mark inside triangle */}
      <line
        x1="140"
        y1="100"
        x2="140"
        y2="130"
        stroke="url(#errorGradient3)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="140" cy="145" r="3" fill="url(#errorGradient3)" />

      {/* Floating shield (safety) */}
      <path
        d="M140 180 C140 180 165 185 165 205 C165 225 140 235 140 235 C140 235 115 225 115 205 C115 185 140 180 140 180 Z"
        fill="url(#errorGradient4)"
        opacity="0.3"
        className="animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Data dots scattered */}
      <circle
        cx="80"
        cy="100"
        r="6"
        fill="url(#errorGradient5)"
        opacity="0.4"
        className="animate-pulse"
      />
      <circle
        cx="200"
        cy="120"
        r="5"
        fill="url(#errorGradient6)"
        opacity="0.4"
        className="animate-pulse"
        style={{ animationDelay: "0.3s" }}
      />
      <circle
        cx="95"
        cy="200"
        r="7"
        fill="url(#errorGradient7)"
        opacity="0.4"
        className="animate-pulse"
        style={{ animationDelay: "0.7s" }}
      />
      <circle
        cx="185"
        cy="195"
        r="6"
        fill="url(#errorGradient8)"
        opacity="0.4"
        className="animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <defs>
        <linearGradient id="errorGradient1" x1="140" y1="30" x2="140" y2="250">
          <stop offset="0%" stopColor="var(--color-danger)" />
          <stop offset="100%" stopColor="var(--color-warning)" />
        </linearGradient>
        <linearGradient id="errorGradient2" x1="140" y1="60" x2="140" y2="220">
          <stop offset="0%" stopColor="var(--color-warning)" />
          <stop offset="100%" stopColor="var(--color-danger)" />
        </linearGradient>
        <linearGradient id="errorGradient3" x1="140" y1="70" x2="140" y2="160">
          <stop offset="0%" stopColor="var(--color-danger)" />
          <stop offset="100%" stopColor="var(--color-warning)" />
        </linearGradient>
        <linearGradient id="errorGradient4" x1="140" y1="180" x2="140" y2="235">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="errorGradient5" x1="80" y1="94" x2="80" y2="106">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="errorGradient6" x1="200" y1="115" x2="200" y2="125">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="errorGradient7" x1="95" y1="193" x2="95" y2="207">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="errorGradient8" x1="185" y1="189" x2="185" y2="201">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ErrorIllustrationIcon;
