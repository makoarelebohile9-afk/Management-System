import { buildDashboardStats } from "../utils/studentHelpers.js";

// Dashboard stat cards. `stats` is passed down from App as a prop; when the
// prop is missing we recompute it locally so the component stays reusable.
function Dashboard({ stats, students = [] }) {
  const { total, enrolled, notEnrolled } = stats ?? buildDashboardStats(students);

  const statistics = [
    { label: "Total students", value: total, icon: "♙", color: "stat-blue" },
    { label: "Enrolled", value: enrolled, icon: "✓", color: "stat-green" },
    { label: "Not enrolled", value: notEnrolled, icon: "○", color: "stat-orange" },
  ];

  return (
    <div className="stats-grid">
      {statistics.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>

          <div>
            <p>{stat.label}</p>
            <h2>{stat.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
