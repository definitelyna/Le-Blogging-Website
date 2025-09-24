import PostSection from "./PostSection";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const id = await params.slug;
  return <PostSection id={id} />;
}
