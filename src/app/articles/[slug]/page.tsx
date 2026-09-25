import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getAllArticles().find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — Thomas Ayih-Akakpo`,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = getAllArticles().some((a) => a.slug === slug);
  if (!exists) notFound();

  const article = await getArticleBySlug(slug);

  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <section className="border-t border-rule">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <Link
              href="/articles"
              className="font-mono text-xs text-muted hover:text-accent"
            >
              ← Articles
            </Link>
            <h1 className="mt-6 text-3xl">{article.title}</h1>
            <p className="mt-2 font-mono text-xs text-muted">{article.date}</p>
            {article.featuredImage && (
              <Image
                src={article.featuredImage}
                alt={article.title}
                width={1200}
                height={630}
                priority
                className="mt-8 w-full rounded object-cover"
              />
            )}
            {article.toc.length > 0 && (
              <nav aria-label="Table of contents" className="mt-10">
                <p className="font-mono text-xs tracking-widest text-muted uppercase">
                  Contents
                </p>
                <ul className="mt-3 flex flex-col gap-1.5 border-l border-rule pl-4">
                  {article.toc.map((entry) => (
                    <li
                      key={entry.id}
                      style={{ marginLeft: (entry.depth - 2) * 16 }}
                    >
                      <a
                        href={`#${entry.id}`}
                        className="text-sm text-muted hover:text-accent"
                      >
                        {entry.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div
              className="article-prose mt-10"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
