import { GetServerSideProps } from "next";
import Link from "next/link";

interface AboutSSRProps {
  requestTime: string;
  description: string;
}

export default function AboutSSR({ requestTime, description }: AboutSSRProps) {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/dashboard">Dashboard (SSR)</Link>
        {" | "}
        <Link href="/about">About SSG version</Link>
      </nav>

      <h1>About This Blog — SSR Version</h1>

      <div
        style={{
          background: "#fff8f0",
          border: "1px solid #f59e0b",
          borderRadius: 8,
          padding: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <strong>Rendering strategy: SSR (Server-Side Rendering)</strong>
        <p style={{ margin: "0.5rem 0 0" }}>
          This page was rendered on the server at <code>{requestTime}</code>. The server runs{" "}
          <code>getServerSideProps</code> on <strong>every request</strong> — timestamp changes each refresh.
        </p>
      </div>

      <p>{description}</p>

      <h2>SSR Characteristics</h2>
      <ul>
        <li>Rendered on server for <strong>every request</strong></li>
        <li>Always has fresh data</li>
        <li>Slower TTFB — server must complete render before responding</li>
        <li>Higher server load under traffic</li>
        <li>Best for: user dashboards, authenticated pages, real-time data</li>
      </ul>

      <h2>SSG vs SSR Comparison</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem", textAlign: "left" }}>Feature</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem", textAlign: "left" }}>SSG</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem", textAlign: "left" }}>SSR</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["When renders", "Build time", "Every request"],
            ["Data freshness", "Stale until rebuild", "Always fresh"],
            ["TTFB", "Fastest (CDN)", "Slower (server work)"],
            ["Server load", "Low", "High"],
            ["Use case", "Blog, docs", "Dashboard, auth"],
          ].map(([feature, ssg, ssr]) => (
            <tr key={feature}>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{feature}</td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem", color: "#0ca678" }}>{ssg}</td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem", color: "#f59e0b" }}>{ssr}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ color: "#888", fontSize: "0.85rem", marginTop: "1rem" }}>
        Refresh this page — the timestamp above updates every time (SSR).
        <br />
        Compare with <Link href="/about">about (SSG)</Link> — its timestamp stays fixed from build time.
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      requestTime: new Date().toISOString(),
      description:
        "This blog demonstrates Next.js rendering strategies: SSG for static content, SSR for dynamic user-specific content, and ISR for content that needs periodic freshness.",
    },
  };
};
