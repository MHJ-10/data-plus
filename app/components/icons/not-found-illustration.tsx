import { cn } from "@/utils";

const NotFoundIllustrationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mx-auto", className)}
    >
      {/* Background gradient circles */}
      <circle cx="140" cy="140" r="120" fill="url(#gradient1)" opacity="0.1" />
      <circle cx="140" cy="140" r="90" fill="url(#gradient2)" opacity="0.15" />

      {/* Floating data elements */}
      <rect
        x="50"
        y="60"
        width="40"
        height="40"
        rx="12"
        fill="url(#gradient3)"
        opacity="0.2"
        className="animate-pulse"
      />
      <rect
        x="190"
        y="80"
        width="35"
        height="35"
        rx="10"
        fill="url(#gradient4)"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <circle
        cx="220"
        cy="160"
        r="18"
        fill="url(#gradient5)"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <rect
        x="60"
        y="190"
        width="30"
        height="30"
        rx="8"
        fill="url(#gradient6)"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Main 404 */}
      <text
        x="140"
        y="155"
        fontSize="72"
        fontWeight="700"
        fill="url(#textGradient)"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
      >
        404
      </text>

      {/* Search magnifying glass */}
      <circle
        cx="140"
        cy="210"
        r="25"
        stroke="url(#gradient7)"
        strokeWidth="4"
        fill="none"
        opacity="0.6"
      />
      <line
        x1="158"
        y1="228"
        x2="175"
        y2="245"
        stroke="url(#gradient7)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />

      <defs>
        <linearGradient id="gradient1" x1="140" y1="20" x2="140" y2="260">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-warning)" />
        </linearGradient>
        <linearGradient id="gradient2" x1="140" y1="50" x2="140" y2="230">
          <stop offset="0%" stopColor="var(--color-warning)" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
        <linearGradient id="gradient3" x1="70" y1="60" x2="70" y2="100">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="gradient4" x1="207" y1="80" x2="207" y2="115">
          <stop offset="0%" stopColor="var(--color-warning)" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="gradient5" x1="220" y1="142" x2="220" y2="178">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="gradient6" x1="75" y1="190" x2="75" y2="220">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="gradient7" x1="140" y1="185" x2="140" y2="235">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-warning)" />
        </linearGradient>
        <linearGradient id="textGradient" x1="140" y1="90" x2="140" y2="160">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="var(--color-warning)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default NotFoundIllustrationIcon;
