import { GetStaticProps } from "next";
import Link from "next/link";
import { Post } from "@/types";
import { getAllPosts } from "@/lib/api";

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1>My Blog</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
            <Link href={`/posts/${post.id}`}>
              <h2 style={{ margin: 0 }}>{post.title}</h2>
            </Link>
            <p style={{ color: "#666", margin: "0.5rem 0" }}>
              By {post.author} | {post.readTime} min read | {post.date}
            </p>
            <div>
              {post.tags.map((tag) => (
                <span key={tag} style={{ marginRight: "0.5rem", color: "#0070f3" }}>
                  #{tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};
