import Image from "next/image";
import Link from "next/link";
import {
  COURSE_ZOOM_DEMOS,
  COURSES,
  AI_AUTOMATION_PRICE,
  MLOPS_MASTERCLASS_DURATION,
} from "@/lib/constants";
import { HOME_SKETCH, sketch } from "@/lib/sketch-assets";

type DashboardCourse = {
  key: "aiAutomation" | "mlopsMasterclass";
  href: string;
  sketch: string;
  sketchAlt: string;
  price: string;
  duration: string;
  highlights: string[];
  accent: "yellow" | "blue";
};

const DASHBOARD_COURSES: DashboardCourse[] = [
  {
    key: "aiAutomation",
    href: "/courses/ai-automation",
    sketch: sketch(HOME_SKETCH.programsAutomation),
    sketchAlt: "Team riding a pencil, learning together",
    price: AI_AUTOMATION_PRICE,
    duration: "2 months",
    highlights: ["12 company agent builds", "Lifetime recordings", "1-on-1 mentorship"],
    accent: "yellow",
  },
  {
    key: "mlopsMasterclass",
    href: "/mlops-aiops-masterclass",
    sketch: sketch(HOME_SKETCH.programsMlops),
    sketchAlt: "Enterprise team at work",
    price: "₹40,000 · $450 USD",
    duration: MLOPS_MASTERCLASS_DURATION,
    highlights: ["150+ hours hands-on", "4 capstone projects", "Placement support"],
    accent: "blue",
  },
];

function CourseDashboardCard({ course }: { course: DashboardCourse }) {
  const zoom = COURSE_ZOOM_DEMOS[course.key];
  const meta = COURSES.find((c) => c.href === course.href);

  return (
    <article className={`notion-dash-card notion-dash-card--${course.accent}`}>
      <div className="notion-dash-sketch-frame">
        <Image
          src={course.sketch}
          alt={course.sketchAlt}
          width={520}
          height={320}
          className="notion-dash-sketch-img"
        />
      </div>

      <div className="notion-dash-body">
        <div className="notion-dash-course">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="notion-dash-badge">{meta?.badge ?? "LIVE"}</span>
            <span className="notion-dash-tag">Course details</span>
          </div>

          <h3 className="notion-dash-title">{zoom.courseName}</h3>
          <p className="notion-dash-desc">{meta?.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="notion-dash-price">{course.price}</span>
            <span className="notion-dash-duration">{course.duration}</span>
          </div>

          <ul className="notion-dash-list">
            {course.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <Link href={course.href} className="notion-dash-link">
            Full syllabus & course page &rarr;
          </Link>
        </div>

        <div className="notion-dash-zoom">
          <div className="flex items-center gap-2 mb-2">
            <span className="notion-dash-live" aria-hidden />
            <span className="notion-dash-zoom-label">Zoom live demo</span>
          </div>
          <p className="notion-dash-zoom-time">{zoom.schedule}</p>
          <p className="notion-dash-zoom-meta">From {zoom.startsOn} · every day</p>

          <div className="notion-dash-zoom-creds">
            <div><span>Meeting ID</span> {zoom.meetingId}</div>
            <div><span>Passcode</span> {zoom.passcode}</div>
          </div>

          <a
            href={zoom.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="notion-dash-btn notion-dash-btn--primary"
          >
            Join Zoom meeting
          </a>
          <div className="flex gap-2 mt-2">
            <a
              href={zoom.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-dash-btn notion-dash-btn--ghost flex-1 text-center"
            >
              Add to calendar
            </a>
            <a
              href={zoom.agendaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-dash-btn notion-dash-btn--ghost flex-1 text-center"
            >
              Agenda
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WelcomeLiveDashboard() {
  return (
    <section id="live-dashboard" className="notion-dashboard">
      <Image
        src={sketch(HOME_SKETCH.heroWatermark)}
        alt=""
        width={400}
        height={200}
        className="notion-dashboard-watermark"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="notion-dashboard-hero">
          <div className="notion-dashboard-hero-art">
            <Image
              src={sketch(HOME_SKETCH.dashboardHero)}
              alt="Students in conversation, hand-drawn illustration"
              width={360}
              height={220}
              className="w-full max-w-[280px] mx-auto h-auto"
              priority
            />
          </div>
          <div className="text-center lg:text-left flex-1">
            <span className="notion-dash-eyebrow">
              <span className="notion-dash-live notion-dash-live--sm" aria-hidden />
              Live welcome dashboard
            </span>
            <h2 className="notion-dashboard-heading">
              Pick your course.<br className="hidden sm:block" /> Join the demo tonight.
            </h2>
            <p className="notion-dashboard-sub">
              Course info and Zoom links, side by side. No hunting through pages.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {DASHBOARD_COURSES.map((c) => (
            <CourseDashboardCard key={c.key} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
