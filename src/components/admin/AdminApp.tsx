"use client";

import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { getAdminClient } from "@/lib/admin-client";
import Analytics from "./Analytics";
import ContentEditor, { ACTIVITY_CONFIG, BANNERS_CONFIG, POSTS_CONFIG, PROJECTS_CONFIG } from "./ContentEditor";
import Dashboard from "./Dashboard";
import Inbox, { LEADS_CONFIG, REQUESTS_CONFIG } from "./Inbox";
import Reviews from "./Reviews";
import { btnDanger, btnDark, btnGhost, btnPrimary, Card, Field, input, Notice, SectionTitle } from "./ui";

type Stage = "loading" | "signed-out" | "mfa" | "recovery" | "not-admin" | "ready";

const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "leads", label: "Leads" },
  { id: "requests", label: "Requests" },
  { id: "analytics", label: "Analytics" },
  { id: "news", label: "News" },
  { id: "banners", label: "Banners" },
  { id: "projects", label: "Projects" },
  { id: "activity", label: "Activity" },
  { id: "reviews", label: "Reviews" },
  { id: "settings", label: "Settings" },
] as const;

function Login({ db }: { db: SupabaseClient }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const { error } = await db.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setMsg({ tone: "error", text: "Email or password is wrong." });
  }

  async function reset() {
    if (!email.trim()) return setMsg({ tone: "error", text: "Type your email first." });
    await db.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/admin/` });
    setMsg({ tone: "ok", text: "If that email is an account, a reset link is on its way." });
  }

  return (
    <form onSubmit={signIn} className="grid gap-4">
      <Field label="Email">
        <input className={input} type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Field>
      <Field label="Password">
        <input className={input} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Field>
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      <button type="submit" className={btnPrimary} disabled={busy}>
        {busy ? "Signing in..." : "Sign in"}
      </button>
      <button type="button" className="text-sm text-slate-500 underline underline-offset-2" onClick={reset}>
        Forgot password
      </button>
    </form>
  );
}

function MfaChallenge({ db, onDone }: { db: SupabaseClient; onDone: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  async function verify(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await db.auth.mfa.listFactors();
    const factor = data?.totp?.[0];
    if (!factor) return setError("No authenticator found on this account.");
    const { error: err } = await db.auth.mfa.challengeAndVerify({ factorId: factor.id, code: code.trim() });
    if (err) return setError("That code did not work. Use the newest code from your authenticator app.");
    onDone();
  }
  return (
    <form onSubmit={verify} className="grid gap-4">
      <Field label="6-digit code from your authenticator app">
        <input className={`${input} tracking-[0.3em] text-lg`} inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} autoFocus />
      </Field>
      {error ? <Notice tone="error">{error}</Notice> : null}
      <button type="submit" className={btnPrimary}>Verify</button>
      <button type="button" className={btnGhost} onClick={() => db.auth.signOut()}>Use another account</button>
    </form>
  );
}

function NewPassword({ db, onDone }: { db: SupabaseClient; onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 12) return setError("Use at least 12 characters.");
    const { error: err } = await db.auth.updateUser({ password });
    if (err) return setError(err.message);
    onDone();
  }
  return (
    <form onSubmit={save} className="grid gap-4">
      <Field label="New password" help="At least 12 characters. A password manager is best.">
        <input className={input} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
      </Field>
      {error ? <Notice tone="error">{error}</Notice> : null}
      <button type="submit" className={btnPrimary}>Save new password</button>
    </form>
  );
}

function SiteDetails({ db, onChanged }: { db: SupabaseClient; onChanged: () => void }) {
  const [years, setYears] = useState("");
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);
  useEffect(() => {
    db.from("site_settings")
      .select("key, value")
      .then(({ data }) => setYears(data?.find((r) => r.key === "years_experience")?.value ?? "8+"));
  }, [db]);
  async function save() {
    const value = years.trim();
    if (!value) return setMsg({ tone: "error", text: "Type a value, for example 8+." });
    const { error } = await db.from("site_settings").upsert({ key: "years_experience", value, updated_at: new Date().toISOString() });
    if (error) return setMsg({ tone: "error", text: error.message });
    setMsg({ tone: "ok", text: "Saved. Press Publish to update every page." });
    onChanged();
  }
  return (
    <Card className="grid gap-3">
      <p className="font-semibold text-[#0f172a]">Site details</p>
      <Field label="Years of experience" help="Used on the homepage, about, masterclass and hire me pages, and in Google's structured data. Example: 8+">
        <input className={`${input} max-w-[10rem]`} value={years} onChange={(e) => setYears(e.target.value)} />
      </Field>
      <div>
        <button type="button" className={btnPrimary} onClick={save}>
          Save
        </button>
      </div>
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
    </Card>
  );
}

function Settings({ db, session, onChanged }: { db: SupabaseClient; session: Session; onChanged: () => void }) {
  const [factors, setFactors] = useState<{ id: string; status: string; friendly_name?: string }[]>([]);
  const [enroll, setEnroll] = useState<{ id: string; qr: string; secret: string } | null>(null);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);

  const load = useCallback(async () => {
    const { data } = await db.auth.mfa.listFactors();
    setFactors((data?.all ?? []).filter((f) => f.factor_type === "totp"));
  }, [db]);
  useEffect(() => {
    load();
  }, [load]);

  async function start() {
    setMsg(null);
    // Clear half-finished setups first, or Supabase refuses a new one.
    for (const f of factors.filter((f) => f.status !== "verified")) await db.auth.mfa.unenroll({ factorId: f.id });
    const { data, error } = await db.auth.mfa.enroll({ factorType: "totp", friendlyName: `Admin ${new Date().toISOString().slice(0, 10)}` });
    if (error) return setMsg({ tone: "error", text: error.message });
    setEnroll({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
  }

  async function confirm() {
    if (!enroll) return;
    const { error } = await db.auth.mfa.challengeAndVerify({ factorId: enroll.id, code: code.trim() });
    if (error) return setMsg({ tone: "error", text: "Code did not match. Try the newest one." });
    setEnroll(null);
    setCode("");
    setMsg({ tone: "ok", text: "2-step login is on. You will be asked for a code each time you sign in." });
    load();
  }

  const verified = factors.filter((f) => f.status === "verified");

  return (
    <div className="grid gap-4">
      <SectionTitle title="Settings" sub={`Signed in as ${session.user.email}`} />
      <SiteDetails db={db} onChanged={onChanged} />
      <Card className="grid gap-3">
        <p className="font-semibold text-[#0f172a]">2-step login</p>
        <p className="text-sm text-slate-600">
          Strongly recommended. After a password, the panel also asks for a code from Google Authenticator, Microsoft Authenticator or 1Password.
        </p>
        {verified.length ? <Notice tone="ok">On. {verified.length} authenticator connected.</Notice> : null}
        {!verified.length && !enroll ? (
          <button type="button" className={btnPrimary} onClick={start}>Turn on 2-step login</button>
        ) : null}
        {enroll ? (
          <div className="grid gap-3">
            <p className="text-sm text-slate-700">Scan this with your authenticator app, then type the 6-digit code.</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={enroll.qr} alt="QR code for your authenticator app" className="w-48 h-48 border border-slate-200 rounded-lg bg-white p-2" />
            <p className="text-xs text-slate-500 break-all">Or enter this key by hand: {enroll.secret}</p>
            <input className={`${input} max-w-[12rem] tracking-[0.3em]`} inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
            <div className="flex gap-2">
              <button type="button" className={btnPrimary} onClick={confirm}>Confirm</button>
              <button type="button" className={btnGhost} onClick={() => setEnroll(null)}>Cancel</button>
            </div>
          </div>
        ) : null}
        {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      </Card>
      <Card className="grid gap-3">
        <p className="font-semibold text-[#0f172a]">Install on your phone</p>
        <p className="text-sm text-slate-600">
          Open this page in Chrome (Android) or Safari (iPhone), then choose <strong>Add to Home screen</strong>. It opens like an app and stays signed in.
        </p>
      </Card>
      <Card>
        <button type="button" className={btnDanger} onClick={() => db.auth.signOut()}>Sign out</button>
      </Card>
    </div>
  );
}

export default function AdminApp() {
  const [db] = useState(() => getAdminClient());
  const [session, setSession] = useState<Session | null>(null);
  const [stage, setStage] = useState<Stage>("loading");
  const [tab, setTab] = useState<string>("dashboard");
  const [dirty, setDirty] = useState(false);

  const check = useCallback(
    async (s: Session | null) => {
      if (!db) return;
      setSession(s);
      if (!s) return setStage("signed-out");
      const { data: aal } = await db.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aal && aal.nextLevel === "aal2" && aal.currentLevel !== "aal2") return setStage("mfa");
      const { data: ok, error } = await db.rpc("is_admin");
      setStage(!error && ok === true ? "ready" : "not-admin");
    },
    [db],
  );

  useEffect(() => {
    if (!db) return;
    db.auth.getSession().then(({ data }) => check(data.session));
    const { data: sub } = db.auth.onAuthStateChange((event, s) => {
      if (event === "PASSWORD_RECOVERY") {
        setSession(s);
        return setStage("recovery");
      }
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "MFA_CHALLENGE_VERIFIED") check(s);
    });
    return () => sub.subscription.unsubscribe();
  }, [db, check]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("rv_admin_tab");
      if (saved) setTab(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function go(id: string) {
    setTab(id);
    try {
      sessionStorage.setItem("rv_admin_tab", id);
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0 });
  }

  if (!db) {
    return (
      <Shell>
        <Notice tone="error">Supabase is not configured for this build (NEXT_PUBLIC_SUPABASE_URL and key are missing).</Notice>
      </Shell>
    );
  }

  if (stage !== "ready" || !session) {
    return (
      <Shell>
        <div className="mx-auto max-w-sm pt-10">
          <Card className="grid gap-4">
            <div>
              <p className="font-display text-2xl font-bold text-[#0f172a]">Admin</p>
              <p className="text-sm text-slate-500">rajinikanthvadla.com</p>
            </div>
            {stage === "loading" ? <p className="text-sm text-slate-500">Checking your session...</p> : null}
            {stage === "signed-out" ? <Login db={db} /> : null}
            {stage === "mfa" ? <MfaChallenge db={db} onDone={() => db.auth.getSession().then(({ data }) => check(data.session))} /> : null}
            {stage === "recovery" ? <NewPassword db={db} onDone={() => db.auth.getSession().then(({ data }) => check(data.session))} /> : null}
            {stage === "not-admin" ? (
              <>
                <Notice tone="error">This account is not an admin. Add it to the admins table in Supabase (see the setup guide).</Notice>
                <button type="button" className={btnDark} onClick={() => db.auth.signOut()}>Sign out</button>
              </>
            ) : null}
          </Card>
        </div>
      </Shell>
    );
  }

  const markDirty = () => setDirty(true);

  return (
    <Shell
      nav={
        <nav className="flex gap-1 overflow-x-auto no-scrollbar" aria-label="Admin sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => go(t.id)}
              aria-current={tab === t.id ? "page" : undefined}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${tab === t.id ? "bg-[#0f172a] text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      }
    >
      {dirty && tab !== "dashboard" ? (
        <div className="mb-4">
          <Notice>
            You have unpublished changes.{" "}
            <button type="button" className="font-semibold underline" onClick={() => go("dashboard")}>
              Go to Publish
            </button>
          </Notice>
        </div>
      ) : null}
      {tab === "dashboard" ? <Dashboard db={db} dirty={dirty} onPublished={() => setDirty(false)} go={go} /> : null}
      {tab === "leads" ? <Inbox db={db} config={LEADS_CONFIG} onChanged={markDirty} /> : null}
      {tab === "requests" ? <Inbox db={db} config={REQUESTS_CONFIG} /> : null}
      {tab === "analytics" ? <Analytics db={db} /> : null}
      {tab === "news" ? <ContentEditor db={db} config={POSTS_CONFIG} onChanged={markDirty} /> : null}
      {tab === "banners" ? <ContentEditor db={db} config={BANNERS_CONFIG} onChanged={markDirty} /> : null}
      {tab === "projects" ? <ContentEditor db={db} config={PROJECTS_CONFIG} onChanged={markDirty} /> : null}
      {tab === "activity" ? <ContentEditor db={db} config={ACTIVITY_CONFIG} onChanged={markDirty} /> : null}
      {tab === "reviews" ? <Reviews db={db} onChanged={markDirty} /> : null}
      {tab === "settings" ? <Settings db={db} session={session} onChanged={markDirty} /> : null}
    </Shell>
  );
}

function Shell({ children, nav }: { children: React.ReactNode; nav?: React.ReactNode }) {
  return (
    <div className="admin-root min-h-screen bg-slate-50" data-no-reveal>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-[#0f172a] text-xs font-bold text-white">RV</span>
          <span className="font-display font-bold text-[#0f172a]">Admin</span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="ml-auto text-sm text-slate-500 underline underline-offset-2">
            View site
          </a>
        </div>
        {nav ? <div className="mx-auto max-w-6xl px-4 pb-2">{nav}</div> : null}
      </header>
      <div className="mx-auto max-w-6xl px-4 py-5 md:py-8">{children}</div>
    </div>
  );
}
