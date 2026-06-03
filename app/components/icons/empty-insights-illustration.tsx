import { cn } from "@/utils";
import React from "react";

const EmptyInsightsIllustrationIcon = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <svg
      width="240"
      height="200"
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mx-auto", className)}
    >
      {/* Central lightbulb */}
      <circle
        cx="120"
        cy="80"
        r="35"
        fill="url(#bulbGlow)"
        opacity="0.15"
        className="animate-pulse"
      />

      {/* Lightbulb shape */}
      <path
        d="M120 50 C105 50 95 62 95 75 C95 85 100 93 107 98 L107 110 C107 113 110 115 113 115 L127 115 C130 115 133 113 133 110 L133 98 C140 93 145 85 145 75 C145 62 135 50 120 50 Z"
        fill="url(#bulbFill)"
        opacity="0.3"
      />
      <rect
        x="113"
        y="115"
        width="14"
        height="4"
        rx="2"
        fill="url(#bulbBase)"
        opacity="0.3"
      />

      {/* AI sparkles around bulb */}
      <circle
        cx="90"
        cy="65"
        r="3"
        fill="#8b5cf6"
        className="animate-pulse"
        opacity="0.6"
      />
      <circle
        cx="150"
        cy="70"
        r="2.5"
        fill="#3b82f6"
        className="animate-pulse"
        style={{ animationDelay: "0.3s" }}
        opacity="0.6"
      />
      <circle
        cx="105"
        cy="45"
        r="2"
        fill="#10b981"
        className="animate-pulse"
        style={{ animationDelay: "0.6s" }}
        opacity="0.6"
      />
      <circle
        cx="135"
        cy="50"
        r="2.5"
        fill="#f59e0b"
        className="animate-pulse"
        style={{ animationDelay: "0.9s" }}
        opacity="0.6"
      />

      {/* Insight cards below */}
      <rect
        x="30"
        y="135"
        width="80"
        height="45"
        rx="12"
        fill="url(#insightCard1)"
        opacity="0.2"
        className="animate-pulse"
      />
      <rect
        x="130"
        y="135"
        width="80"
        height="45"
        rx="12"
        fill="url(#insightCard2)"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: "0.4s" }}
      />

      {/* Card content lines */}
      <rect
        x="40"
        y="145"
        width="30"
        height="3"
        rx="1.5"
        fill="#8b5cf6"
        opacity="0.4"
      />
      <rect
        x="40"
        y="153"
        width="50"
        height="2"
        rx="1"
        fill="#8b5cf6"
        opacity="0.3"
      />
      <rect
        x="40"
        y="159"
        width="45"
        height="2"
        rx="1"
        fill="#8b5cf6"
        opacity="0.3"
      />
      <circle cx="45" cy="170" r="2" fill="#8b5cf6" opacity="0.4" />

      <rect
        x="140"
        y="145"
        width="30"
        height="3"
        rx="1.5"
        fill="#3b82f6"
        opacity="0.4"
      />
      <rect
        x="140"
        y="153"
        width="50"
        height="2"
        rx="1"
        fill="#3b82f6"
        opacity="0.3"
      />
      <rect
        x="140"
        y="159"
        width="45"
        height="2"
        rx="1"
        fill="#3b82f6"
        opacity="0.3"
      />
      <circle cx="145" cy="170" r="2" fill="#3b82f6" opacity="0.4" />

      <defs>
        <radialGradient id="bulbGlow" cx="120" cy="80" r="35">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </radialGradient>
        <linearGradient id="bulbFill" x1="120" y1="50" x2="120" y2="115">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="bulbBase" x1="120" y1="115" x2="120" y2="119">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="insightCard1" x1="70" y1="135" x2="70" y2="180">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="insightCard2" x1="170" y1="135" x2="170" y2="180">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default EmptyInsightsIllustrationIcon;
