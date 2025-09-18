export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = await params.slug;
  return <div>Blog Post: {slug}</div>;
}
