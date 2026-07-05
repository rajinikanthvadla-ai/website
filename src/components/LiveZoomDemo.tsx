import type { COURSE_ZOOM_DEMOS } from "@/lib/constants";

type ZoomDemo = (typeof COURSE_ZOOM_DEMOS)[keyof typeof COURSE_ZOOM_DEMOS];

type Props = {
  demo: ZoomDemo;
  variant?: "light" | "dark";
};

export default function LiveZoomDemo({ demo, variant = "light" }: Props) {
  const dark = variant === "dark";

  return (
    <section
      id="live-demo"
      className={
        dark
          ? "bg-slate-800 border-y border-slate-700 py-10"
          : "bg-gradient-to-r from-blue-50 via-white to-orange-50 border-y border-blue-100 py-10"
      }
    >
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={
            dark
              ? "bg-slate-900 border border-slate-600 rounded-2xl p-6 md:p-8"
              : "bg-white border-2 border-blue-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-blue-100/50"
          }
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={
                dark
                  ? "bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                  : "bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
              }
            >
              Live on Zoom
            </span>
            <span
              className={
                dark
                  ? "text-orange-400 text-xs font-bold uppercase tracking-wide"
                  : "text-orange-600 text-xs font-bold uppercase tracking-wide"
              }
            >
              {demo.sessionLabel}
            </span>
          </div>

          <h2
            className={
              dark
                ? "font-display text-xl md:text-2xl font-bold text-white mb-2"
                : "font-display text-xl md:text-2xl font-bold text-slate-900 mb-2"
            }
          >
            {demo.courseName}
          </h2>

          <p className={dark ? "text-slate-300 text-sm mb-1" : "text-slate-600 text-sm mb-1"}>
            <strong className={dark ? "text-white" : "text-slate-900"}>{demo.schedule}</strong>
            {" · "}Starting {demo.startsOn}
          </p>
          <p className={dark ? "text-slate-500 text-xs mb-5" : "text-slate-500 text-xs mb-5"}>
            Meeting ID: {demo.meetingId} · Passcode: {demo.passcode}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={demo.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-800 transition-colors"
            >
              Join Zoom Meeting &rarr;
            </a>
            <a
              href={demo.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                dark
                  ? "inline-flex justify-center items-center border border-slate-500 text-slate-200 px-6 py-3 rounded-xl text-sm font-bold hover:border-slate-300 transition-colors"
                  : "inline-flex justify-center items-center border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl text-sm font-bold hover:border-blue-400 transition-colors"
              }
            >
              Add to Calendar
            </a>
            <a
              href={demo.agendaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                dark
                  ? "inline-flex justify-center items-center text-orange-400 px-4 py-3 text-sm font-bold hover:underline"
                  : "inline-flex justify-center items-center text-orange-600 px-4 py-3 text-sm font-bold hover:underline"
              }
            >
              Meeting agenda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
