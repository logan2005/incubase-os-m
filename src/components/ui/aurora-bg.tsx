"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,rgba(13,107,110,0.15),transparent_60%)] blur-3xl animate-aurora-1" />
        <div className="absolute -bottom-1/2 -right-1/4 w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.1),transparent_60%)] blur-3xl animate-aurora-2" />
        <div className="absolute top-1/4 left-1/2 w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_60%)] blur-3xl animate-aurora-3" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
