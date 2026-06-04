import { cn } from "@/utils";

const EmptyTableIllustrationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="240"
      height="200"
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mx-auto", className)}
    >
      {/* Table structure */}
      <rect
        x="40"
        y="50"
        width="160"
        height="120"
        rx="14"
        fill="url(#tableBg)"
        opacity="0.15"
      />

      {/* Table header */}
      <rect
        x="40"
        y="50"
        width="160"
        height="30"
        rx="14"
        fill="url(#tableHeader)"
        opacity="0.2"
      />
      <line
        x1="40"
        y1="80"
        x2="200"
        y2="80"
        stroke="#e5e7eb"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Empty rows */}
      <rect
        x="50"
        y="90"
        width="140"
        height="15"
        rx="6"
        fill="#e5e7eb"
        opacity="0.15"
        className="animate-pulse"
      />
      <rect
        x="50"
        y="112"
        width="140"
        height="15"
        rx="6"
        fill="#e5e7eb"
        opacity="0.15"
        className="animate-pulse"
        style={{ animationDelay: "0.2s" }}
      />
      <rect
        x="50"
        y="134"
        width="140"
        height="15"
        rx="6"
        fill="#e5e7eb"
        opacity="0.15"
        className="animate-pulse"
        style={{ animationDelay: "0.4s" }}
      />

      {/* Placeholder columns in header */}
      <rect
        x="50"
        y="58"
        width="35"
        height="4"
        rx="2"
        fill="#8b5cf6"
        opacity="0.3"
      />
      <rect
        x="95"
        y="58"
        width="30"
        height="4"
        rx="2"
        fill="#3b82f6"
        opacity="0.3"
      />
      <rect
        x="135"
        y="58"
        width="25"
        height="4"
        rx="2"
        fill="#10b981"
        opacity="0.3"
      />
      <rect
        x="170"
        y="58"
        width="20"
        height="4"
        rx="2"
        fill="#f59e0b"
        opacity="0.3"
      />

      {/* Dataset icons floating */}
      <circle
        cx="60"
        cy="185"
        r="8"
        fill="url(#dataIcon1)"
        opacity="0.3"
        className="animate-pulse"
      />
      <rect
        x="80"
        y="179"
        width="12"
        height="12"
        rx="3"
        fill="url(#dataIcon2)"
        opacity="0.3"
        className="animate-pulse"
        style={{ animationDelay: "0.3s" }}
      />
      <circle
        cx="168"
        cy="185"
        r="8"
        fill="url(#dataIcon3)"
        opacity="0.3"
        className="animate-pulse"
        style={{ animationDelay: "0.6s" }}
      />

      <defs>
        <linearGradient id="tableBg" x1="120" y1="50" x2="120" y2="170">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="tableHeader" x1="120" y1="50" x2="120" y2="80">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="dataIcon1" x1="60" y1="177" x2="60" y2="193">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="dataIcon2" x1="86" y1="179" x2="86" y2="191">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="dataIcon3" x1="168" y1="177" x2="168" y2="193">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default EmptyTableIllustrationIcon;
