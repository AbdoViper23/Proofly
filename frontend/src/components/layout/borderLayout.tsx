import React, { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import CrossSVG from "../svg/CrossSVG";

interface SectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id: string;
}

export default function BorderLayout({
  children,
  className,
  style,
  id,
}: SectionProps) {
  return (
    <div className="border-b border-[#c0c2c4] px-5 mb-3">
      <section
        id={id}
        style={{ ...style }}
        className={cn(
          "border-x-gray border-x relative p-3 max-w-7xl mx-auto",
          className
        )}
      >
        <CrossSVG className="absolute -left-3 -bottom-3 " />
        <CrossSVG className="absolute -right-3 -bottom-3" />
        {children}
      </section>
    </div>
  );
}
