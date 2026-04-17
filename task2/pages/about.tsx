import { GetStaticProps } from "next";
import Link from "next/link";

interface AboutProps {
  buildTime: string;
  description: string;
}

export default function About({ buildTime, description }: AboutProps) {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/dashboard">Dashboard (SSR)</Link>
        {" | "}
        <Link href="/about-ssr">About SSR version</Link>
      </nav>

      <h1>About This Blog — SSG Version</h1>

      <div
        style={{
          background: "#f0fff4",
          border: "1px solid #0ca678",
          borderRadius: 8,
          padding: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <strong>Rendering strategy: SSG (Static Site Generation)</strong>
        <p style={{ margin: "0.5rem 0 0" }}>
          This page was pre-built at <code>{buildTime}</code>. It is served as static HTML from CDN — no server
          processing per request. Data never changes unless you rebuild.
        </p>
      </div>

      <p>{description}</p>

      <h2>SSG Characteristics</h2>
      <ul>
        <li>Pre-rendered at <strong>build time</strong></li>
        <li>Served from CDN as static HTML</li>
        <li>Fastest TTFB (Time to First Byte)</li>
        <li>Data can become stale without rebuild or ISR</li>
        <li>Best for: blog posts, docs, marketing pages</li>
      </ul>

      <p style={{ color: "#888", fontSize: "0.85rem" }}>
        Compare: refresh this page multiple times — the build timestamp never changes.
        <br />
        See <Link href="/about-ssr">about-ssr</Link> to observe SSR timestamp updating every refresh.
      </p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      buildTime: new Date().toISOString(),
      description:
        "This blog demonstrates Next.js rendering strategies: SSG for static content, SSR for dynamic user-specific content, and ISR for content that needs periodic freshness.",
    },
  };
};
