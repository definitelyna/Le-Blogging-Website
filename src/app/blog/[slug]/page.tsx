import PostSection from "./PostSection";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const id = params.slug;
  return <PostSection id={id} />;
}
