import { cn } from "@/utils";

const InsufficientDataIllustrationIcon = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <svg
      width="280"
      height="240"
      viewBox="0 0 280 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mx-auto", className)}
    >
      {/* Background circles */}
      <circle
        cx="140"
        cy="120"
        r="100"
        fill="url(#insufficientGrad1)"
        opacity="0.08"
      />
      <circle
        cx="140"
        cy="120"
        r="70"
        fill="url(#insufficientGrad2)"
        opacity="0.12"
      />

      {/* Broken/incomplete chart */}
      <rect
        x="50"
        y="80"
        width="180"
        height="120"
        rx="16"
        fill="url(#chartFrame)"
        opacity="0.15"
      />

      {/* Incomplete bars with gaps */}
      <rect
        x="75"
        y="150"
        width="20"
        height="30"
        rx="6"
        fill="url(#bar1)"
        opacity="0.3"
      />
      <rect
        x="105"
        y="140"
        width="20"
        height="15"
        rx="6"
        fill="url(#bar2)"
        opacity="0.2"
        className="animate-pulse"
      />
      <rect
        x="165"
        y="145"
        width="20"
        height="10"
        rx="6"
        fill="url(#bar3)"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: "0.3s" }}
      />
      <rect
        x="195"
        y="155"
        width="20"
        height="25"
        rx="6"
        fill="url(#bar4)"
        opacity="0.3"
      />

      {/* Missing data indicators (dashed lines) */}
      <line
        x1="125"
        y1="180"
        x2="155"
        y2="180"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.4"
      />
      <circle cx="135" cy="165" r="3" fill="#ef4444" opacity="0.5" />
      <circle cx="145" cy="170" r="2.5" fill="#ef4444" opacity="0.5" />

      {/* Alert icon */}
      <circle
        cx="140"
        cy="50"
        r="20"
        fill="url(#alertCircle)"
        opacity="0.2"
        className="animate-pulse"
      />
      <path
        d="M140 40 L140 55"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="140" cy="60" r="2" fill="#f59e0b" />

      {/* Scattered empty data points */}
      <circle cx="60" cy="210" r="4" fill="#e5e7eb" opacity="0.4" />
      <circle cx="90" cy="215" r="3.5" fill="#e5e7eb" opacity="0.4" />
      <circle cx="190" cy="212" r="4" fill="#e5e7eb" opacity="0.4" />
      <circle cx="220" cy="208" r="3.5" fill="#e5e7eb" opacity="0.4" />

      <defs>
        <linearGradient
          id="insufficientGrad1"
          x1="140"
          y1="20"
          x2="140"
          y2="220"
        >
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient
          id="insufficientGrad2"
          x1="140"
          y1="50"
          x2="140"
          y2="190"
        >
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="chartFrame" x1="140" y1="80" x2="140" y2="200">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="bar1" x1="85" y1="150" x2="85" y2="180">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="bar2" x1="115" y1="140" x2="115" y2="155">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="bar3" x1="175" y1="145" x2="175" y2="155">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="bar4" x1="205" y1="155" x2="205" y2="180">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <radialGradient id="alertCircle" cx="140" cy="50" r="20">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default InsufficientDataIllustrationIcon;
