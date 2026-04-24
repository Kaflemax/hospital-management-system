import { useEffect, useLayoutEffect, useMemo, useState } from "react";

const STORAGE_KEY = "hms-theme-dark";

const adminKpis = [
  { title: "Appointments", value: "650", color: "#7c3aed", points: [20, 25, 18, 30, 22, 35, 28] },
  { title: "Operations", value: "54", color: "#f59e0b", points: [10, 14, 9, 18, 12, 22, 16] },
  { title: "New Patients", value: "129", color: "#22c55e", points: [14, 10, 20, 18, 26, 22, 30] },
  { title: "Earning", value: "$20,125", color: "#0ea5e9", points: [24, 18, 28, 22, 35, 30, 40] }
];

function sparklinePoints(points, width = 160, height = 44, padding = 6) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(1, max - min);
  const xStep = (width - padding * 2) / (points.length - 1);
  const mapY = (v) => padding + (height - padding * 2) * (1 - (v - min) / range);

  return points
    .map((p, i) => {
      const x = padding + i * xStep;
      const y = mapY(p);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function AdminSidebar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState({ appointments: true, doctors: false });

  return (
    <aside className="sidebar admin-sidebar">
      <div className="admin-profile">
        <div className="admin-profile-avatar">S</div>
        <div className="admin-profile-meta">
          <div className="admin-profile-name">Sarah Smith</div>
          <div className="admin-profile-role">Admin</div>
        </div>
      </div>

      <nav className="admin-nav">
        <button type="button" className="admin-nav-item active">
          <span className="admin-nav-icon">▦</span> Dashboard
        </button>

        <button
          type="button"
          className="admin-nav-group"
          onClick={() => setOpen((s) => ({ ...s, appointments: !s.appointments }))}
        >
          <span className="admin-nav-icon">▣</span> Appointments
          <span className="admin-nav-toggle">{open.appointments ? "-" : "+"}</span>
        </button>
        {open.appointments && (
          <div className="admin-subitems">
            {[
              "Appointments",
              "Appointment Calendar",
              "View Appointment",
              "Book Appointment",
              "Edit Appointment"
            ].map((label) => (
              <button key={label} type="button" className="admin-subitem">
                {label}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          className="admin-nav-group"
          onClick={() => setOpen((s) => ({ ...s, doctors: !s.doctors }))}
        >
          <span className="admin-nav-icon">DR</span> Doctors
          <span className="admin-nav-toggle">{open.doctors ? "-" : "+"}</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-footer-label">Appearance</span>
        <label className="theme-toggle">
          <span className="theme-toggle-text">Dark mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <span className="theme-toggle-slider" aria-hidden="true" />
        </label>
      </div>
    </aside>
  );
}

function AdminDashboard() {
  const surveyPoints = [12, 28, 20, 34, 40, 36, 50, 62, 74, 68, 80, 78];
  const oldPoints = [18, 22, 26, 24, 30, 28, 34, 33, 39, 41, 44, 52];
  const surveyPath = sparklinePoints(surveyPoints, 520, 140, 10);
  const oldPath = sparklinePoints(oldPoints, 520, 140, 10);

  return (
    <div className="admin-main">
      <div className="admin-breadcrumb">Dashboard &gt; Dashboard</div>

      <div className="admin-kpi-grid">
        {adminKpis.map((kpi) => (
          <div key={kpi.title} className="glass admin-kpi-card">
            <div className="admin-kpi-top">
              <div className="admin-kpi-icon" style={{ background: `${kpi.color}33`, borderColor: `${kpi.color}55` }}>
                <div className="admin-kpi-icon-inner" style={{ background: kpi.color }} />
              </div>
              <div className="admin-kpi-title">{kpi.title}</div>
            </div>

            <div className="admin-kpi-value">{kpi.value}</div>
            <svg viewBox="0 0 160 44" className="admin-spark" aria-hidden="true">
              <polyline points={sparklinePoints(kpi.points, 160, 44, 6)} style={{ fill: "none", stroke: kpi.color, strokeWidth: 2.2 }} />
            </svg>
          </div>
        ))}
      </div>

      <div className="admin-two-col">
        <div className="admin-left">
          <div className="glass admin-card admin-survey">
            <div className="admin-card-head">
              <h3>Hospital Survey</h3>
              <select className="admin-select" defaultValue="Monthly" aria-label="survey period">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>

            <div className="admin-survey-legend">
              <span className="admin-legend-item">
                <i className="legend-dot legend-dot-blue" /> New Patients
              </span>
              <span className="admin-legend-item">
                <i className="legend-dot legend-dot-orange" /> Old Patients
              </span>
            </div>

            <div className="admin-survey-chart">
              <svg viewBox="0 0 520 140" width="100%" height="160" aria-hidden="true">
                <polyline points={surveyPath} fill="none" stroke="#3b82f6" strokeWidth="2.6" />
                <polyline points={oldPath} fill="none" stroke="#f97316" strokeWidth="2.6" opacity="0.9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="admin-right">
          <div className="glass admin-card admin-summary">
            <h3>Total Appointments</h3>
            <div className="admin-summary-main">128</div>
            <div className="admin-summary-actions">
              <button type="button" className="summary-pill summary-pill-blue">
                73 <span>Completed</span>
              </button>
              <button type="button" className="summary-pill summary-pill-orange">
                55 <span>Upcoming</span>
              </button>
            </div>
          </div>

          <div className="glass admin-card admin-revenue">
            <h3>Revenue</h3>
            <div className="admin-revenue-main">$120,000</div>
            <div className="admin-revenue-sub">This month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const portalConfig = {
  admin: {
    title: "Admin Portal",
    showDiagnosis: false,
    avatar: "AD",
    menu: ["Dashboard", "Department", "Doctors", "Nurses", "Patients", "Pharmacy", "Reports"],
    metrics: [
      { title: "Active Appointments", value: "54", trend: "+8 today" },
      { title: "Doctor Availability", value: "23", trend: "2 off duty" },
      { title: "Open Incidents", value: "11", trend: "3 urgent" }
    ],
    tableTitle: "Patient Details",
    tableColumns: ["Patient", "Patient ID", "Age", "Gender", "Assigned Doctor", "Treatment", "Status"],
    tableRows: [
      ["Shisir", "44785", "36", "Male", "Dr Sulochana", "Root canal", "Recovering"],
      ["Sunita", "32658", "35", "Female", "Dr Sharmila", "Bells palsy", "In care"],
      ["Sambid", "45682", "29", "Male", "Dr Diwakar", "High BP", "Diagnosed"],
      ["Arthab", "12345", "25", "Male", "Dr Sulochana", "CSBG", "Stable"],
      ["Prasanna", "41801", "48", "Male", "Dr Sharmila", "CSBG", "Critical"]
    ],
    dashboard: {
      quickActions: ["Create appointment", "Assign doctor", "Approve billing"],
      activity: [
        "Emergency ward occupancy increased by 8%",
        "2 insurance claims approved in last hour",
        "Night shift roster published"
      ],
      tasks: ["Review discharge summary (4)", "Approve pharmacy orders (9)", "Audit lab TAT report"],
      diagnosis: {
        labels: ["Shisir", "Sunita", "Sambid", "Arthab", "Prasanna", "Ankit", "Nitisha"],
        scores: [96, 77, 74, 54, 63, 45, 88]
      }
    }
  },
  doctor: {
    title: "Doctor Portal",
    showDiagnosis: true,
    avatar: "DR",
    menu: ["Dashboard", "My Schedule", "Patient Queue", "Prescriptions", "Lab Requests", "Messages"],
    metrics: [
      { title: "Today Consultations", value: "18", trend: "6 pending" },
      { title: "Critical Follow-ups", value: "4", trend: "needs review" },
      { title: "Prescriptions Issued", value: "27", trend: "+5 from yesterday" }
    ],
    tableTitle: "Consultation Queue",
    tableColumns: ["Patient", "Visit ID", "Slot", "Complaint", "Priority", "Room", "Status"],
    tableRows: [
      ["Ankit", "V-9022", "09:15", "Chest pain", "High", "C-03", "In care"],
      ["Nitisha", "V-9023", "09:30", "Migraine", "Medium", "C-03", "Diagnosed"],
      ["Shisir", "V-9024", "09:45", "Fever", "Low", "C-04", "Recovering"],
      ["Sunita", "V-9025", "10:00", "Diabetes review", "Medium", "C-02", "Stable"],
      ["Sambid", "V-9026", "10:15", "Back pain", "Low", "C-01", "In care"]
    ],
    dashboard: {
      quickActions: ["Start consultation", "Create prescription", "Request lab test"],
      activity: [
        "Cardiology queue updated with 2 new patients",
        "Critical alert from ICU bed 07",
        "Prescription refill request from patient portal"
      ],
      tasks: ["Sign e-prescriptions (7)", "Review lab reports (5)", "Update treatment notes"],
      diagnosis: {
        labels: ["Shisir", "Sunita", "Sambid", "Arthab", "Prasanna", "Ankit", "Nitisha"],
        scores: [96, 77, 74, 54, 63, 45, 88]
      }
    }
  },
  laboratory: {
    title: "Laboratory Portal",
    showDiagnosis: true,
    avatar: "LB",
    menu: ["Dashboard", "Sample Intake", "Test Queue", "Result Validation", "Equipment", "Inventory"],
    metrics: [
      { title: "Samples Received", value: "72", trend: "+14 this shift" },
      { title: "Tests In Progress", value: "31", trend: "6 urgent" },
      { title: "Reports Released", value: "48", trend: "95% on-time" }
    ],
    tableTitle: "Lab Test Workflow",
    tableColumns: ["Sample", "Patient ID", "Test", "Collected", "Technician", "Machine", "Status"],
    tableRows: [
      ["S-40012", "Shisir (P-44785)", "CBC", "08:00", "Latha", "Analyzer-2", "Recovering"],
      ["S-40013", "Sunita (P-32658)", "Lipid Profile", "08:20", "Rahul", "Analyzer-1", "In care"],
      ["S-40014", "Sambid (P-45682)", "HbA1c", "08:40", "Priya", "Analyzer-3", "Diagnosed"],
      ["S-40015", "Arthab (P-12345)", "Culture", "09:00", "Mohan", "Incubator-A", "Stable"],
      ["S-40016", "Prasanna (P-41801)", "Troponin", "09:10", "Divya", "Analyzer-4", "Critical"]
    ],
    dashboard: {
      quickActions: ["Register sample", "Assign technician", "Release report"],
      activity: [
        "Analyzer-3 calibration completed",
        "Urgent troponin test flagged",
        "Sample rejection rate dropped to 1.2%"
      ],
      tasks: ["Validate pending results (12)", "Restock CBC kits", "Review quality control logs"],
      diagnosis: {
        labels: ["Shisir", "Sunita", "Sambid", "Arthab", "Prasanna", "Ankit", "Nitisha"],
        scores: [96, 77, 74, 54, 63, 45, 88]
      }
    }
  },
  patient: {
    title: "Patient Portal",
    showDiagnosis: true,
    avatar: "PT",
    menu: ["Dashboard", "Appointments", "Prescriptions", "Lab Reports", "Billing", "Support"],
    metrics: [
      { title: "Upcoming Visits", value: "3", trend: "next in 2 days" },
      { title: "Active Prescriptions", value: "5", trend: "1 refill due" },
      { title: "Pending Reports", value: "2", trend: "available today" }
    ],
    tableTitle: "My Health Timeline",
    tableColumns: ["Date", "Visit ID", "Doctor", "Department", "Diagnosis", "Prescription", "Status"],
    tableRows: [
      ["Apr 02", "V-8842", "Dr Sulochana", "Dental", "Root canal review", "Pain control", "Recovering"],
      ["Mar 19", "V-8720", "Dr Sharmila", "Neuro", "Bell's palsy", "Nerve support", "In care"],
      ["Mar 06", "V-8601", "Dr Diwakar", "Cardio", "High BP", "BP regulator", "Diagnosed"],
      ["Feb 28", "V-8560", "Dr Sulochana", "Cardio", "CSBG follow-up", "Blood thinner", "Stable"],
      ["Feb 07", "V-8432", "Dr Sharmila", "Cardio", "CSBG post-op", "Cardiac support", "Critical"]
    ],
    dashboard: {
      quickActions: ["Book appointment", "Request teleconsult", "Download report"],
      activity: [
        "New lab report available for download",
        "Reminder: medication at 08:00 PM",
        "Insurance pre-auth approved"
      ],
      tasks: ["Complete wellness survey", "Upload prior prescriptions", "Confirm next appointment"],
      diagnosis: {
        labels: ["Shisir", "Sunita", "Sambid", "Arthab", "Prasanna", "Ankit", "Nitisha"],
        scores: [96, 77, 74, 54, 63, 45, 88]
      }
    }
  }
};

function getStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function getRadarPoint(index, score, total) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const radius = (score / 100) * 68;
  const x = 90 + radius * Math.cos(angle);
  const y = 90 + radius * Math.sin(angle);
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

function getRadarXY(index, radius, total, center = 100) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
}

function App() {
  const [portal, setPortal] = useState("admin");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === "1";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("theme-dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, darkMode ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [darkMode]);

  const current = useMemo(() => portalConfig[portal], [portal]);

  return (
    <div className="page">
      <div className="bg-shape shape-left" />
      <div className="bg-shape shape-right" />

      <header className="header">
        <h1>{current.title}</h1>
        <div className="search-user">
          <input type="text" placeholder="Search here" />
          <div className="avatar">{current.avatar}</div>
        </div>
      </header>

      <div className="portal-switcher glass">
        {Object.keys(portalConfig).map((key) => (
          <button
            key={key}
            type="button"
            className={portal === key ? "active" : ""}
            onClick={() => setPortal(key)}
          >
            {portalConfig[key].title}
          </button>
        ))}
      </div>

      <main className="layout">
        {portal === "admin" ? (
          <AdminSidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        ) : (
          <aside className="sidebar">
            <div className="brand">
              <span className="brand-icon">+</span>
              <div>
                <h2>HMS</h2>
                <small>{current.title}</small>
              </div>
            </div>
            <nav className="sidebar-nav">
              {current.menu.map((item, index) => (
                <button key={item} className={index === 0 ? "active" : ""}>
                  {item}
                </button>
              ))}
            </nav>
            <div className="sidebar-footer">
              <span className="sidebar-footer-label">Appearance</span>
              <label className="theme-toggle">
                <span className="theme-toggle-text">Dark mode</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="theme-toggle-slider" aria-hidden="true" />
              </label>
            </div>
          </aside>
        )}

        <section className="content">
          {portal === "admin" ? (
            <AdminDashboard />
          ) : (
            <>
              <div className="glass card patient-card">
                <div className="card-head">
                  <h3>{current.tableTitle}</h3>
                  <span>Today</span>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {current.tableColumns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {current.tableRows.map((row) => (
                        <tr key={row[1]}>
                          {row.slice(0, row.length - 1).map((cell) => (
                            <td key={cell}>{cell}</td>
                          ))}
                          <td>
                            <span className={`pill ${getStatusClass(row[row.length - 1])}`}>
                              {row[row.length - 1]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="cards-grid">
                {current.metrics.map((metric) => (
                  <article key={metric.title} className="glass mini-card">
                    <h4>{metric.title}</h4>
                    <p className="metric">{metric.value}</p>
                    <small>{metric.trend}</small>
                  </article>
                ))}
              </div>

              <div className="dashboard-grid">
                <section className="glass dashboard-panel">
                  <h3>Quick Actions</h3>
                  <div className="chip-list">
                    {current.dashboard.quickActions.map((item) => (
                      <button key={item} type="button" className="chip">
                        {item}
                      </button>
                    ))}
                  </div>
                </section>
                <section className="glass dashboard-panel">
                  <h3>Recent Activity</h3>
                  <ul className="dashboard-list">
                    {current.dashboard.activity.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section className="glass dashboard-panel">
                  <h3>Pending Tasks</h3>
                  <ul className="dashboard-list">
                    {current.dashboard.tasks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                {current.showDiagnosis && (
                  <section className="glass dashboard-panel diagnosis-panel">
                    <h3>Patient Diagnosis</h3>
                    <div className="diagnosis-chart-wrap">
                      <svg
                        viewBox="0 0 220 190"
                        className="diagnosis-chart"
                        role="img"
                        aria-label="Patient diagnosis radar chart"
                      >
                        {[20, 36, 52, 68].map((ring) => (
                          <polygon
                            key={ring}
                            points={current.dashboard.diagnosis.scores
                              .map((_, index) => {
                                const point = getRadarXY(
                                  index,
                                  ring,
                                  current.dashboard.diagnosis.scores.length,
                                  90
                                );
                                return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
                              })
                              .join(" ")}
                            className="diag-grid"
                          />
                        ))}
                        {current.dashboard.diagnosis.scores.map((_, index) => {
                          const point = getRadarXY(
                            index,
                            68,
                            current.dashboard.diagnosis.scores.length,
                            90
                          );
                          return (
                            <line
                              key={`axis-${current.dashboard.diagnosis.labels[index]}`}
                              x1="90"
                              y1="90"
                              x2={point.x.toFixed(1)}
                              y2={point.y.toFixed(1)}
                              className="diag-axis"
                            />
                          );
                        })}
                        <polygon
                          points={current.dashboard.diagnosis.scores
                            .map((score, index) =>
                              getRadarPoint(index, score, current.dashboard.diagnosis.scores.length)
                            )
                            .join(" ")}
                          className="diag-area"
                        />
                        <polyline
                          points={current.dashboard.diagnosis.scores
                            .map((score, index) =>
                              getRadarPoint(index, score, current.dashboard.diagnosis.scores.length)
                            )
                            .join(" ")}
                          className="diag-line"
                        />
                        {current.dashboard.diagnosis.labels.map((label, index) => {
                          const point = getRadarXY(
                            index,
                            84,
                            current.dashboard.diagnosis.labels.length,
                            90
                          );
                          return (
                            <text
                              key={`label-${label}`}
                              x={point.x.toFixed(1)}
                              y={point.y.toFixed(1)}
                              className="diag-label"
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              {label}
                            </text>
                          );
                        })}
                      </svg>
                      <ul className="diag-legend">
                        {current.dashboard.diagnosis.labels.map((label, i) => (
                          <li key={label}>
                            <span>{label}</span>
                            <strong>{current.dashboard.diagnosis.scores[i]}%</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
