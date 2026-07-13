interface WorkDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WorkDetailsPage({
  params,
}: WorkDetailsPageProps) {
  const { slug } = await params;

  return (
    <main>
      <h1>{slug}</h1>
    </main>
  );
}