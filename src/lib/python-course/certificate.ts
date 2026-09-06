export type CertificateKind = "foundations" | "full";

export type CertificateRecord = {
  name: string;
  kind: CertificateKind;
  issuedAt: string;
  code: string;
};

const CERT_KEY = "python-course-certificate-v1";

export function makeCertificateCode(name: string, kind: CertificateKind, issuedAt: string): string {
  const raw = `${name.trim().toLowerCase()}|${kind}|${issuedAt.slice(0, 10)}`;
  let hash = 2166136261;
  for (let i = 0; i < raw.length; i += 1) {
    hash ^= raw.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const hex = (hash >>> 0).toString(16).toUpperCase().padStart(8, "0");
  const prefix = kind === "full" ? "RV-PY-FULL" : "RV-PY-FND";
  return `${prefix}-${hex}`;
}

export function saveCertificateRecord(record: CertificateRecord): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CERT_KEY, JSON.stringify(record));
  } catch {
    // ignore
  }
}

export function loadCertificateRecord(): CertificateRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CERT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CertificateRecord>;
    if (
      typeof parsed.name !== "string" ||
      (parsed.kind !== "foundations" && parsed.kind !== "full") ||
      typeof parsed.issuedAt !== "string" ||
      typeof parsed.code !== "string"
    ) {
      return null;
    }
    return {
      name: parsed.name,
      kind: parsed.kind,
      issuedAt: parsed.issuedAt,
      code: parsed.code,
    };
  } catch {
    return null;
  }
}
