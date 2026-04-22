import Link from "next/link";
import Slideshow from "@/slideshow";

export default function Home() {
  return (
    <>
      <Slideshow />
      
      {/* Dev Mode Link */}
      <Link
        href="/dev"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 
                   bg-[#FAF3E8]/80 backdrop-blur-sm border border-[#C68B59]/20 
                   rounded-full shadow-lg hover:shadow-xl hover:bg-[#FAF3E8]
                   transition-all duration-300 group"
        aria-label="Open Dev Mode"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-[#C68B59] group-hover:rotate-12 transition-transform duration-300"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#2C1A0E]">
          Dev Mode
        </span>
      </Link>
    </>
  );
}
