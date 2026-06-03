import { cn } from "@/utils";
import React from "react";

const EmptyAnalysesIllustrationIcon = ({
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
      {/* Upload cloud */}
      <path
        d="M120 60 C100 60 85 75 85 95 C70 95 60 105 60 120 C60 135 70 145 85 145 L155 145 C170 145 180 135 180 120 C180 110 175 100 165 95 C165 75 150 60 130 60 C128 60 125 60 120 60 Z"
        fill="url(#cloudGradient)"
        opacity="0.2"
        className="animate-pulse"
      />

      {/* Upload arrow */}
      <path
        d="M120 85 L120 120"
        stroke="url(#arrowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M110 95 L120 85 L130 95"
        stroke="url(#arrowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />

      {/* Dataset cards floating */}
      <rect
        x="40"
        y="155"
        width="55"
        height="35"
        rx="10"
        fill="url(#card1)"
        opacity="0.3"
        className="animate-pulse"
      />
      <rect
        x="105"
        y="155"
        width="55"
        height="35"
        rx="10"
        fill="url(#card2)"
        opacity="0.3"
        className="animate-pulse"
        style={{ animationDelay: "0.3s" }}
      />
      <rect
        x="170"
        y="155"
        width="55"
        height="35"
        rx="10"
        fill="url(#card3)"
        opacity="0.3"
        className="animate-pulse"
        style={{ animationDelay: "0.6s" }}
      />

      {/* Small data icons on cards */}
      <rect
        x="47"
        y="163"
        width="12"
        height="2"
        rx="1"
        fill="#8b5cf6"
        opacity="0.5"
      />
      <rect
        x="47"
        y="169"
        width="18"
        height="2"
        rx="1"
        fill="#8b5cf6"
        opacity="0.5"
      />
      <rect
        x="47"
        y="175"
        width="15"
        height="2"
        rx="1"
        fill="#8b5cf6"
        opacity="0.5"
      />

      <rect
        x="112"
        y="163"
        width="12"
        height="2"
        rx="1"
        fill="#3b82f6"
        opacity="0.5"
      />
      <rect
        x="112"
        y="169"
        width="18"
        height="2"
        rx="1"
        fill="#3b82f6"
        opacity="0.5"
      />
      <rect
        x="112"
        y="175"
        width="15"
        height="2"
        rx="1"
        fill="#3b82f6"
        opacity="0.5"
      />

      <rect
        x="177"
        y="163"
        width="12"
        height="2"
        rx="1"
        fill="#10b981"
        opacity="0.5"
      />
      <rect
        x="177"
        y="169"
        width="18"
        height="2"
        rx="1"
        fill="#10b981"
        opacity="0.5"
      />
      <rect
        x="177"
        y="175"
        width="15"
        height="2"
        rx="1"
        fill="#10b981"
        opacity="0.5"
      />

      <defs>
        <linearGradient id="cloudGradient" x1="120" y1="60" x2="120" y2="145">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="arrowGradient" x1="120" y1="85" x2="120" y2="120">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="card1" x1="67.5" y1="155" x2="67.5" y2="190">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="card2" x1="132.5" y1="155" x2="132.5" y2="190">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="card3" x1="197.5" y1="155" x2="197.5" y2="190">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default EmptyAnalysesIllustrationIcon;
