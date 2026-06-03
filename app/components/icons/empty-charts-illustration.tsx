import { cn } from "@/utils";
import React from "react";

const EmptyChartsIllustrationIcon = ({
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
      {/* Empty chart canvas - bar chart placeholder */}
      <rect
        x="30"
        y="30"
        width="180"
        height="140"
        rx="16"
        fill="url(#chartBg)"
        opacity="0.3"
      />

      {/* Chart grid lines */}
      <line
        x1="40"
        y1="60"
        x2="200"
        y2="60"
        stroke="#e5e7eb"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />
      <line
        x1="40"
        y1="95"
        x2="200"
        y2="95"
        stroke="#e5e7eb"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />
      <line
        x1="40"
        y1="130"
        x2="200"
        y2="130"
        stroke="#e5e7eb"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />

      {/* Placeholder bars */}
      <rect
        x="55"
        y="105"
        width="22"
        height="40"
        rx="6"
        fill="url(#bar1)"
        opacity="0.2"
        className="animate-pulse"
      />
      <rect
        x="87"
        y="85"
        width="22"
        height="60"
        rx="6"
        fill="url(#bar2)"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: "0.2s" }}
      />
      <rect
        x="119"
        y="95"
        width="22"
        height="50"
        rx="6"
        fill="url(#bar3)"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: "0.4s" }}
      />
      <rect
        x="151"
        y="75"
        width="22"
        height="70"
        rx="6"
        fill="url(#bar4)"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: "0.6s" }}
      />

      {/* Sparkle icons indicating "waiting for data" */}
      <circle
        cx="120"
        cy="100"
        r="2"
        fill="#8b5cf6"
        opacity="0.6"
        className="animate-pulse"
      />
      <circle
        cx="130"
        cy="95"
        r="1.5"
        fill="#3b82f6"
        opacity="0.6"
        className="animate-pulse"
        style={{ animationDelay: "0.3s" }}
      />
      <circle
        cx="110"
        cy="105"
        r="1.5"
        fill="#10b981"
        opacity="0.6"
        className="animate-pulse"
        style={{ animationDelay: "0.6s" }}
      />

      <defs>
        <linearGradient id="chartBg" x1="120" y1="30" x2="120" y2="170">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="bar1" x1="66" y1="105" x2="66" y2="145">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="bar2" x1="98" y1="85" x2="98" y2="145">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="bar3" x1="130" y1="95" x2="130" y2="145">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="bar4" x1="162" y1="75" x2="162" y2="145">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default EmptyChartsIllustrationIcon;
