import Link from "next/link"

export default function QuickActions() {
  return (
    <section className="relative z-10 border-b border-slate-200 bg-white pt-20">
      <div className="mx-auto flex w-full flex-col gap-2 px-1 py-2 sm:flex-row">

        <Link
          href="/translation"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-blue-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800 sm:text-base"
        >
          <span>Request Certified Translation – Upload your Documents</span>
          <span className="text-lg leading-none">→</span>
        </Link>

        <Link
          href="/track"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-blue-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800 sm:text-base"
        >
          <span>Track your Application Progress</span>
          <span className="text-lg leading-none">→</span>
        </Link>

      </div>
    </section>
  )
}