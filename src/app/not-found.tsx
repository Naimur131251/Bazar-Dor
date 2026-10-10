import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-error/5 blur-3xl" />

      <section className="relative mx-auto w-full max-w-2xl text-center">
        {/* Error icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9 9h.01M15 9h.01" />
            <path d="M8.5 15a5 5 0 0 1 7 0" />
          </svg>
        </div>

        {/* 404 */}
        <p className="text-sm font-bold tracking-[0.3em] text-primary">
          PAGE NOT FOUND
        </p>

        <h1 className="mt-2 text-8xl font-black tracking-tight text-primary sm:text-9xl">
          404<span className="text-error">.</span>
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-base-content sm:text-3xl">
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-base-content/70 sm:text-base">
          আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, ঠিকানা পরিবর্তন করা হয়েছে অথবা
          পেজটি আর বিদ্যমান নেই।
        </p>

        {/* Error label */}
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-error/10 px-4 py-2 text-sm font-medium text-error">
          <span className="h-2 w-2 rounded-full bg-error" />
          ভুল অথবা অকার্যকর URL
        </div>

        {/* Home button */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#046F32] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 10 9-7 9 7" />
              <path d="M5 9v11h14V9" />
              <path d="M9 20v-7h6v7" />
            </svg>
            হোম পেজে ফিরে যান
          </Link>
        </div>

        <p className="mt-10 text-xs text-base-content/50">
          বাজার দর — আপনার নিত্যপ্রয়োজনীয় পণ্যের দামের নির্ভরযোগ্য ঠিকানা।
        </p>
      </section>
    </main>
  );
}
