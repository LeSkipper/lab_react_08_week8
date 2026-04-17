import { GetServerSideProps } from "next";
import Link from "next/link";
import { User, Notification, getCurrentUser, getUserNotifications, getUserAnalytics } from "@/lib/api";

interface DashboardProps {
  user: User;
  notifications: Notification[];
  analytics: {
    pageViews: number;
    sessions: number;
    bounceRate: number;
  };
  currentTime: string;
}

export default function Dashboard({ user, notifications, analytics, currentTime }: DashboardProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/about">About (SSG)</Link>
        {" | "}
        <Link href="/about-ssr">About SSR</Link>
      </nav>

      <header style={{ borderBottom: "2px solid #0070f3", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>Welcome, {user.name}</h1>
        <p style={{ color: "#666", margin: "0.25rem 0" }}>
          {user.email} — Role: <strong>{user.role}</strong>
        </p>
      </header>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2>Analytics</h2>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ background: "#f0f4ff", padding: "1rem", borderRadius: 8, minWidth: 140 }}>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{analytics.pageViews.toLocaleString()}</div>
            <div style={{ color: "#555" }}>Page Views</div>
          </div>
          <div style={{ background: "#f0fff4", padding: "1rem", borderRadius: 8, minWidth: 140 }}>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{analytics.sessions.toLocaleString()}</div>
            <div style={{ color: "#555" }}>Sessions</div>
          </div>
          <div style={{ background: "#fff8f0", padding: "1rem", borderRadius: 8, minWidth: 140 }}>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{analytics.bounceRate.toFixed(1)}%</div>
            <div style={{ color: "#555" }}>Bounce Rate</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2>Notifications ({unreadCount} unread)</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((notif) => (
            <li
              key={notif.id}
              style={{
                padding: "0.75rem 1rem",
                marginBottom: "0.5rem",
                borderRadius: 6,
                background: notif.read ? "#f9f9f9" : "#fff",
                borderLeft: `4px solid ${notif.type === "info" ? "#0070f3" : notif.type === "success" ? "#0ca678" : "#f59e0b"}`,
                opacity: notif.read ? 0.7 : 1,
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginRight: "0.5rem",
                  color: notif.type === "info" ? "#0070f3" : notif.type === "success" ? "#0ca678" : "#f59e0b",
                }}
              >
                {notif.type}
              </span>
              {notif.message}
              <span style={{ float: "right", fontSize: "0.8rem", color: "#999" }}>{notif.createdAt}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer style={{ borderTop: "1px solid #eee", paddingTop: "0.75rem", color: "#888", fontSize: "0.85rem" }}>
        <strong>SSR:</strong> Page rendered on server at {currentTime}. Data is always fresh on every request.
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = getCurrentUser();
  const [notifications, analytics] = await Promise.all([
    getUserNotifications(user.id),
    getUserAnalytics(user.id),
  ]);

  return {
    props: {
      user,
      notifications,
      analytics,
      currentTime: new Date().toISOString(),
    },
  };
};
