import { useState } from "react";

function getMonthData(yearMonth) {
  const [y, m] = yearMonth.split("-").map(Number);
  const firstDay = new Date(y, m - 1, 1).getDay();
  const daysInMonth = new Date(y, m, 0).getDate();
  const monthName = new Date(y, m - 1, 1).toLocaleString("default", { month: "long" });
  return { name: monthName, year: y, days: daysInMonth, startDay: firstDay };
}

const STATUS_CONFIG = {
  sent: { label: "Sent", color: "#4ADE80", bg: "rgba(74,222,128,0.12)", icon: "✓" },
  scheduled: { label: "Scheduled", color: "#60A5FA", bg: "rgba(96,165,250,0.12)", icon: "◷" },
  draft: { label: "Draft", color: "#FBBF24", bg: "rgba(251,191,36,0.12)", icon: "✎" },
  none: { label: "No Email", color: "#475569", bg: "transparent", icon: "" },
};

/*
 * ============================================================
 *  EMAIL DATA — EDIT THIS SECTION TO UPDATE THE CALENDAR
 * ============================================================
 *  Each entry is a date (YYYY-MM-DD) with:
 *    subject: The email subject line
 *    status:  "sent" | "scheduled" | "draft"
 *    link:    URL to the email (leave "" if not yet available)
 *    notes:   Any notes for the client
 * ============================================================
 */
/*
 * ============================================================
 *  EMAIL DATA FORMAT — SUPPORTS 1 OR 2 EMAILS PER DAY
 * ============================================================
 *  Each date key maps to an ARRAY of email objects (1 or 2).
 *
 *  One email per day:
 *    "2026-04-07": [{ subject: "...", status: "...", link: "...", notes: "..." }]
 *
 *  Two emails per day:
 *    "2026-04-12": [
 *      { subject: "Email A", status: "sent",      link: "...", notes: "..." },
 *      { subject: "Email B", status: "scheduled", link: "...", notes: "..." },
 *    ]
 * ============================================================
 */
const EMAIL_DATA = {
  // ——— FEBRUARY 2026 ———
  "2026-02-01": [{ subject: "Empty", status: "draft", link: "#", notes: "n/a" }],
  "2026-02-02": [{ subject: "Empty", status: "draft", link: "#", notes: "n/a" }],
  "2026-02-03": [{ subject: "Empty", status: "draft", link: "#", notes: "n/a" }],
  "2026-02-04": [{ subject: "Empty", status: "draft", link: "#", notes: "n/a" }],
  "2026-02-05": [{ subject: "Empty", status: "draft", link: "#", notes: "n/a" }],
  "2026-02-06": [{ subject: "Empty", status: "draft", link: "#", notes: "n/a" }],
  "2026-02-07": [{ subject: "Empty", status: "draft", link: "#", notes: "n/a" }],
  "2026-02-08": [{ subject: "Empty", status: "draft", link: "#", notes: "n/a" }],
  "2026-02-09": [{ subject: "Empty", status: "draft", link: "#", notes: "n/a" }],
  "2026-02-10": [{ subject: "Market reframe", status: "sent", link: "https://docs.google.com/document/d/13DdYz5TZK_ZURIQi3wTskquwY9KkEauEoMvxwg2wYh0/edit?usp=sharing", notes: "No middle of email ad yet. Trust first" }],
  "2026-02-11": [{ subject: "Hardware Wallet", status: "sent", link: "https://docs.google.com/document/d/1qOZljlR74-q-XTfojLia6LCloWBhcsEI6E-p1mT3mgM/edit?usp=sharing", notes: "Could we aff link a couple wallets?" }],
  "2026-02-12": [{ subject: "Direct offer", status: "sent", link: "https://docs.google.com/document/d/1h89jkHzmOn5Ah2B3oLFuFNqi7jL6aORk1nvyrnaRY9E/edit?usp=sharing", notes: "To Kevin 995 vsl" }],
  "2026-02-13": [{ subject: "Trustpilot", status: "sent", link: "https://docs.google.com/document/d/1a3CKCKZiB6Y0h3jBp-WZ3cJxwwZp75kVI2SS-Nj1r3M/edit?usp=sharing", notes: "No notes" }],
  "2026-02-14": [{ subject: "TBD", status: "draft", link: "", notes: "TBD" }],
  "2026-02-15": [{ subject: "TBD", status: "draft", link: "", notes: "TBD" }],
  "2026-02-16": [{ subject: "TBD", status: "draft", link: "", notes: "TBD" }],
  "2026-02-17": [{ subject: "TBD", status: "draft", link: "", notes: "TBD" }],
  "2026-02-18": [{ subject: "TBD", status: "draft", link: "", notes: "CTA to video" }],
  "2026-02-19": [{ subject: "TBD", status: "draft", link: "", notes: "CTA to video" }],
  "2026-02-20": [{ subject: "Jamie 1", status: "sent", link: "https://docs.google.com/document/d/1xUdeNli_PGdq-FcNUy6veBG72NZgUoBEMC2KT0gAkvc/edit?usp=sharing", notes: "CTA to video" }],
  "2026-02-21": [{ subject: "Jamie 2", status: "sent", link: "https://docs.google.com/document/d/1TntqRoK2hTTnb62M1NuTNSqc8oBpeGxRPV3rjguInVI/edit?usp=sharing", notes: "CTA to video" }],
  "2026-02-22": [{ subject: "Jamie 3", status: "scheduled", link: "https://docs.google.com/document/d/12u5BEKWAWRIgQmnN9Chxonp5UATRbmBVpYtEM_YVg3o/edit?usp=sharing", notes: "CTA to video" }],
  "2026-02-23": [{ subject: "Jamie 4", status: "scheduled", link: "https://docs.google.com/document/d/13QgOtpONdM43-lCxgikNINCnEsqLWLazjM7LMkIyPOk/edit?usp=sharing", notes: "CTA to video" }],
  "2026-02-24": [{ subject: "Jamie 5", status: "scheduled", link: "https://docs.google.com/document/d/1G4mjE02v6LEk6Ke6CK3Yj8rOkYcyEomN-oV2r5ICzj4/edit?usp=sharing", notes: "CTA to video" }],
  "2026-02-25": [{ subject: "Jamie cart close 1", status: "scheduled", link: "https://docs.google.com/document/d/1haGvL39SnHd8zaTO74tEh72yZ0sTVf-QTdAlFxCNeBY/edit?usp=sharing", notes: "Straight to checkout" }],
  "2026-02-26": [{ subject: "Jamie cart close 2", status: "scheduled", link: "https://docs.google.com/document/d/1nzS8EwLefFznIrG5SSe9NIqIat8MzSgCZLBE6KNCD0Y/edit?usp=sharing", notes: "Straight to checkout" }],
  "2026-02-27": [{ subject: "Jamie cart close 3", status: "scheduled", link: "https://docs.google.com/document/d/1kfy-xPPX5anTdaVr36eMEvhbzG2xD_TOVmAjnM2rbV8/edit?usp=sharing", notes: "Straight to checkout" }],
  "2026-02-28": [{ subject: "Jamie cart close 4", status: "scheduled", link: "https://docs.google.com/document/d/1Vd8QSbMWJIWAit3Vgnu5vh_UU5OeFXyzn1pm_RsWEJY/edit?usp=sharing", notes: "Straight to checkout" }],

  // ——— MARCH 2026 ———
  // One email:  "2026-03-01": [{ subject: "...", status: "draft", link: "", notes: "" }],
  // Two emails: "2026-03-01": [{ subject: "Email A", ... }, { subject: "Email B", ... }],

  // ——— APRIL 2026 ———
  "2026-04-07": [{ subject: "The $126,000 Ghost Pattern", status: "sent", link: "https://docs.google.com/document/d/1v4KcU7jCSDjqZgyTVHLEjVbcJ-3HRTc58-ylbnVyVy0/edit?usp=sharing", notes: "Push to call" }],
  "2026-04-08": [{ subject: "Hormuz is closed", status: "sent", link: "https://docs.google.com/document/d/1_8fCLtpCHfJ8MOxvwNqHjqKBTZ0JBFZVOxHp35LJYlY/edit?usp=sharing", notes: "Push to call" }],
  
  "2026-04-13": [
  { subject: "Your final clue", status: "scheduled", link: "https://docs.google.com/document/d/1DLZ6Qb3jYHtJjV59qp54zGiWL2i9UojuysGh102M2ss/edit?usp=sharing", notes: "Send to ppl who opened #1" },
  { subject: "Beware of tomorrow", status: "scheduled", link: "https://docs.google.com/document/d/1OxGQPqStdyATwIMgaNjs_6ArU7zHQ6hIMMLTtaptVhQ/edit?usp=sharing", notes: "Send to entire list" },
],
  "2026-04-14": [
  { subject: "Why I'm quitting crypto", status: "sent", link: "https://docs.google.com/document/d/1xW2X2M5GW5sE6WLkQl5kys8IC4_9KUA1ITNuV0j1fAw/edit?usp=sharing", notes: "Entire list" },
  { subject: "A mountain of cash", status: "sent", link: "https://docs.google.com/document/d/1wiC4Nl1KRo0aWL2Ydh_CuYCUj_cp0vA7QxuyzS9DXfg/edit?usp=sharing", notes: "Entire list" },
],

  "2026-04-15": [
  { subject: "Not Nvidia", status: "scheduled", link: "https://docs.google.com/document/d/1rQNpNL9khr55p6yhy190qWiXx8s4Qle4L-uFK2QEEkU/edit?usp=sharing", notes: "Entire list" },
  { subject: "Invisible play", status: "scheduled", link: "https://docs.google.com/document/d/16m1hOoOQ4KiosWwge31r2Wg4IL5wAASNGNNLSKYB5DM/edit?usp=sharing", notes: "Entire list" },
],

  // ——— MAY 2026 ———
  // "2026-05-01": [{ subject: "...", status: "draft", link: "", notes: "" }],
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.none;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: config.color,
        background: config.bg,
        padding: "2px 8px",
        borderRadius: 4,
        border: `1px solid ${config.color}22`,
      }}
    >
      {config.icon && <span style={{ fontSize: 11 }}>{config.icon}</span>}
      {config.label}
    </span>
  );
}

function SingleEmailCard({ email, index, total }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: total > 1 ? 16 : 0,
        background: total > 1 ? "rgba(255,255,255,0.03)" : "transparent",
        borderRadius: total > 1 ? 10 : 0,
        border: total > 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      {total > 1 && (
        <p style={{ color: "#475569", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
          Email {index + 1} of {total}
        </p>
      )}
      <div>
        <p style={{ color: "#64748B", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px 0" }}>
          Subject Line
        </p>
        <p style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 600, margin: 0, lineHeight: 1.4, fontFamily: "'Playfair Display', Georgia, serif" }}>
          {email.subject}
        </p>
      </div>
      <div>
        <p style={{ color: "#64748B", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px 0" }}>
          Status
        </p>
        <StatusBadge status={email.status} />
      </div>
      {email.link && (
        <div>
          <p style={{ color: "#64748B", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px 0" }}>
            Email Link
          </p>
          <a
            href={email.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#4ADE80",
              fontSize: 14,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "rgba(74,222,128,0.08)",
              borderRadius: 8,
              border: "1px solid rgba(74,222,128,0.2)",
            }}
          >
            View Email →
          </a>
        </div>
      )}
      {email.notes && (
        <div>
          <p style={{ color: "#64748B", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px 0" }}>
            Notes
          </p>
          <p style={{ color: "#CBD5E1", fontSize: 14, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
            {email.notes}
          </p>
        </div>
      )}
    </div>
  );
}

function EmailModal({ date, emails, onClose }) {
  if (!date) return null;

  const dateObj = new Date(date + "T12:00:00");
  const formatted = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(145deg, #111827, #0a101e)",
          border: "1px solid rgba(74,222,128,0.15)",
          borderRadius: 16,
          padding: 32,
          maxWidth: 520,
          width: "90%",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(74,222,128,0.05)",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <p style={{ color: "#4ADE80", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0, marginBottom: 4 }}>
              {emails && emails.length > 1 ? `${emails.length} Emails Scheduled` : "Email Details"}
            </p>
            <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>{formatted}</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#94A3B8",
              width: 32,
              height: 32,
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            ✕
          </button>
        </div>

        {emails && emails.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {emails.map((email, i) => (
              <SingleEmailCard key={i} email={email} index={i} total={emails.length} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <p style={{ color: "#475569", fontSize: 40, margin: "0 0 12px 0" }}>—</p>
            <p style={{ color: "#64748B", fontSize: 14, margin: 0 }}>No email scheduled for this date</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [activeMonth, setActiveMonth] = useState("2026-02");
  const [selectedDate, setSelectedDate] = useState(null);

  const monthData = getMonthData(activeMonth);
  const today = new Date().toISOString().slice(0, 10);

  const blanks = Array.from({ length: monthData.startDay }, (_, i) => i);
  const days = Array.from({ length: monthData.days }, (_, i) => i + 1);

  const monthEmails = Object.entries(EMAIL_DATA).filter(([d]) => d.startsWith(activeMonth));
  const allMonthEmailItems = monthEmails.flatMap(([, arr]) => arr);
  const sentCount = allMonthEmailItems.filter((e) => e.status === "sent").length;
  const scheduledCount = allMonthEmailItems.filter((e) => e.status === "scheduled").length;
  const draftCount = allMonthEmailItems.filter((e) => e.status === "draft").length;

  const dateKey = (day) => {
    const d = String(day).padStart(2, "0");
    return `${activeMonth}-${d}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #050a14 0%, #0a1628 40%, #0d1117 100%)",
        fontFamily: "'Inter', -apple-system, sans-serif",
        color: "#E2E8F0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow effects */}
      <div style={{ position: "absolute", top: -200, right: -200, width: 500, height: 500, background: "radial-gradient(circle, rgba(74,222,128,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }
        .day-cell { transition: all 0.2s ease; cursor: pointer; }
        .day-cell:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(74,222,128,0.1); border-color: rgba(74,222,128,0.3) !important; }
        .month-tab { transition: all 0.2s ease; cursor: pointer; }
        .month-tab:hover { background: rgba(255,255,255,0.05) !important; }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "32px 40px 0", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 8,
            background: "linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))",
            border: "1px solid rgba(74,222,128,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>
            🛡
          </div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 700,
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "-0.01em",
              background: "linear-gradient(135deg, #F1F5F9, #94A3B8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              KEYSTONE INVESTORS
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "#4ADE80", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Daily Email Calendar
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ padding: "24px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "Sent", value: sentCount, color: "#4ADE80" },
            { label: "Scheduled", value: scheduledCount, color: "#60A5FA" },
            { label: "Drafts", value: draftCount, color: "#FBBF24" },
            { label: "Total Days", value: monthData.days, color: "#94A3B8" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "12px 20px",
                minWidth: 120,
                flex: 1,
              }}
            >
              <p style={{ margin: 0, fontSize: 11, color: "#64748B", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {s.label}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 28, fontWeight: 700, color: s.color, fontFamily: "'Playfair Display', Georgia, serif" }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Month Tabs */}
      <div style={{ padding: "0 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["2026-02", "2026-03", "2026-04", "2026-05"].map((m) => {
            const d = getMonthData(m);
            const isActive = m === activeMonth;
            return (
              <button
                key={m}
                className="month-tab"
                onClick={() => setActiveMonth(m)}
                style={{
                  padding: "10px 24px",
                  borderRadius: 8,
                  border: isActive ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  background: isActive ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.02)",
                  color: isActive ? "#4ADE80" : "#94A3B8",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                }}
              >
                {d.name} {d.year}
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ padding: "0 40px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Weekday Headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                style={{
                  padding: "12px 8px",
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#475569",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day Cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {blanks.map((b) => (
              <div key={`blank-${b}`} style={{ minHeight: 100, borderRight: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)" }} />
            ))}
            {days.map((day) => {
              const key = dateKey(day);
              const emails = EMAIL_DATA[key];
              const isToday = key === today;
              const isPast = key < today;
              // Use the first email's status color for the bottom bar
              const statusColor = emails ? STATUS_CONFIG[emails[0].status].color : "transparent";

              return (
                <div
                  key={day}
                  className="day-cell"
                  onClick={() => setSelectedDate(key)}
                  style={{
                    minHeight: 100,
                    padding: 10,
                    borderRight: "1px solid rgba(255,255,255,0.03)",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    background: isToday
                      ? "rgba(74,222,128,0.06)"
                      : emails
                        ? "rgba(255,255,255,0.01)"
                        : "transparent",
                    borderLeft: isToday ? "2px solid #4ADE80" : "2px solid transparent",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: isToday ? 700 : 500,
                        color: isToday ? "#4ADE80" : isPast ? "#64748B" : "#CBD5E1",
                      }}
                    >
                      {day}
                    </span>
                    {isToday && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: "#4ADE80",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          animation: "pulse 2s ease infinite",
                        }}
                      >
                        TODAY
                      </span>
                    )}
                    {emails && emails.length > 1 && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: "#60A5FA", background: "rgba(96,165,250,0.15)", padding: "1px 5px", borderRadius: 4 }}>
                        ×{emails.length}
                      </span>
                    )}
                  </div>

                  {emails && (
                    <>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                        {emails.map((email, i) => (
                          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {emails.length > 1 && (
                              <p style={{ margin: 0, fontSize: 9, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                #{i + 1}
                              </p>
                            )}
                            <p
                              style={{
                                margin: 0,
                                fontSize: 11,
                                fontWeight: 500,
                                color: "#CBD5E1",
                                lineHeight: 1.3,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {email.subject}
                            </p>
                            <StatusBadge status={email.status} />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {emails && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: statusColor,
                        opacity: 0.5,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ padding: "0 40px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {Object.entries(STATUS_CONFIG)
            .filter(([k]) => k !== "none")
            .map(([key, config]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: config.color }} />
                <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>{config.label}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 40px 32px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 11, color: "#334155", letterSpacing: "0.05em" }}>
          Keystone Investors Club · Daily Email Calendar · {monthData.name} {monthData.year}
        </p>
      </div>

      {/* Modal */}
      {selectedDate && (
        <EmailModal
          date={selectedDate}
          emails={EMAIL_DATA[selectedDate]}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
