import Link from "next/link";

export default function NotFound() {
  return (
    <main className="animated-gradient mx-3 mt-4 flex min-h-[65vh] items-center justify-center rounded-2xl px-4 py-10 sm:mx-5 sm:mt-5 sm:min-h-[70vh] sm:px-6 sm:py-12 lg:min-h-[75vh]">
      <section className="w-full max-w-xl text-center">
        {/* Animated 404 */}
        <div className="relative inline-block">
          <h1 className="animate-[glitch_3s_infinite] text-7xl font-black tracking-tighter text-primary sm:text-8xl md:text-9xl">
            404<span className="text-error">.</span>
          </h1>

          <span className="absolute -right-2 top-1 h-2.5 w-2.5 animate-ping rounded-full bg-error sm:-right-3 sm:top-2 sm:h-3 sm:w-3" />

          <span className="absolute -left-3 bottom-4 h-2 w-2 animate-pulse rounded-full bg-primary sm:-left-4 sm:bottom-5" />
        </div>

        {/* Heading */}
        <h2 className="mt-3 text-lg font-bold leading-snug text-base-content sm:mt-4 sm:text-xl md:text-2xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-sm px-1 text-sm leading-6 text-gray-600 sm:px-0 sm:text-base">
          মনে হচ্ছে আপনি ভুল ঠিকানায় চলে এসেছেন। হোম পেজে ফিরে সঠিক পেজটি খুঁজে
          নিন।
        </p>

        {/* Responsive Button */}
        <Link
          href="/"
          className="group relative mt-6 inline-flex max-w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#046F32] hover:shadow-lg sm:mt-7 sm:px-6 sm:text-base"
        >
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="relative h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          >
            <path d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-7h6v7" />
          </svg>

          <span className="relative">হোম পেজে ফিরে যান →</span>
        </Link>

        {/* Footer Text */}
        <p className="mt-7 px-2 text-xs leading-5 text-gray-500 sm:mt-8 sm:text-sm">
          বাজার দর — সঠিক দামের বিশ্বস্ত ঠিকানা
        </p>
      </section>
    </main>
  );
}
