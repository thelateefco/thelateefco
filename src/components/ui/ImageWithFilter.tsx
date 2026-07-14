"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "../../lib/utils";

interface ImageWithFilterProps extends Omit<ImageProps, "className"> {
  className?: string;
  filterIntensity?: "light" | "medium" | "strong";
}

export default function ImageWithFilter({
  className,
  filterIntensity = "medium",
  ...props
}: ImageWithFilterProps) {
  const filterClasses = {
    light: "mix-blend-multiply opacity-90",
    medium: "mix-blend-multiply opacity-80",
    strong: "mix-blend-multiply opacity-70",
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image {...props} className="object-cover" />
      <div
        className={cn(
          "absolute inset-0 bg-[#ECE6DF] pointer-events-none",
          filterClasses[filterIntensity]
        )}
      />
    </div>
  );
}