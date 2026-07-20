"use client";

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 opacity-40 py-4 md:py-6">
      <span className="label text-[0.5rem] tracking-[0.25em] hidden sm:block">
        Scroll
      </span>
      <div className="w-px h-8 sm:h-12 bg-[#1A1A1A] relative overflow-hidden">
        <div className="scroll-line-anim" />
      </div>
    </div>
    //
  );
}