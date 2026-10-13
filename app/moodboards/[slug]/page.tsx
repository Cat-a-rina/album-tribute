import Link from "next/link";
import { notFound } from "next/navigation";
import { getMoodboardImages, moodboards } from "@/lib/moodboards";

export const dynamicParams = false;

export function generateStaticParams() {
  return moodboards.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const board = moodboards.find((b) => b.slug === slug);
  return { title: board ? `${board.title} moodboard` : "Moodboard" };
}

export default async function MoodboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const board = moodboards.find((b) => b.slug === slug);
  if (!board) notFound();

  const images = getMoodboardImages(slug);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <Link href="/" className="text-sm text-foreground/60 hover:text-foreground">
        ← Hub
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{board.title}</h1>
      <p className="mt-2 mb-10 text-foreground/70">{board.description}</p>

      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {images.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            loading="lazy"
            className="mb-4 block w-full break-inside-avoid rounded"
          />
        ))}
      </div>
    </main>
  );
}
