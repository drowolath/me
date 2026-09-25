import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Articles — Thomas Ayih-Akakpo",
};

export default function ArticlesIndex() {
  const articles = getAllArticles();

  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <section className="border-t border-rule">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h1 className="font-mono text-xs tracking-widest text-muted uppercase">
              Articles
            </h1>
            <div className="mt-10 flex flex-col divide-y divide-rule">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group flex gap-5 py-7 first:pt-0"
                >
                  {article.featuredImage && (
                    <Image
                      src={article.featuredImage}
                      alt=""
                      width={96}
                      height={96}
                      className="h-24 w-24 shrink-0 rounded object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="min-w-0 text-xl underline decoration-rule underline-offset-4 group-hover:decoration-accent">
                        {article.title}
                      </h2>
                      <span className="shrink-0 font-mono text-xs whitespace-nowrap text-muted">
                        {article.date}
                      </span>
                    </div>
                    <p className="mt-3 max-w-xl leading-relaxed text-muted">
                      {article.description}
                    </p>
                  </div>
                </Link>
              ))}
              {articles.length === 0 && (
                <p className="py-7 text-muted">Nothing here yet.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
