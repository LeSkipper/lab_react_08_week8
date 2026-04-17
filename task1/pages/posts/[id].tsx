import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Post } from "@/types";
import { getAllPosts, getPostById, getAuthorById } from "@/lib/api";

interface PostProps {
  post: Post;
  author: { name: string; bio: string };
}

export default function PostPage({ post, author }: PostProps) {
  return (
    <article style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <Link href="/">← Back to blog</Link>
      <h1 style={{ marginTop: "1rem" }}>{post.title}</h1>
      <p style={{ color: "#666" }}>
        By {author.name} | {post.readTime} min read | {post.date}
      </p>
      <p style={{ fontSize: "0.9rem", color: "#888" }}>{author.bio}</p>
      <div style={{ marginTop: "1.5rem", lineHeight: 1.7 }}>
        <p>{post.content}</p>
      </div>
      <div style={{ marginTop: "1rem" }}>
        {post.tags.map((tag) => (
          <span key={tag} style={{ marginRight: "0.5rem", color: "#0070f3" }}>
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostById(params?.id as string);
  if (!post) return { notFound: true };

  const author = await getAuthorById(post.author);
  return {
    props: {
      post,
      author: { name: author?.name ?? "Unknown", bio: author?.bio ?? "" },
    },
    revalidate: 60,
  };
};
