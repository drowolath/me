import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Element, Root, Text } from "hast";
import type { VFile } from "vfile";

const articlesDirectory = path.join(process.cwd(), "content/articles");
const embedsDirectory = path.join(process.cwd(), "content/embeds");

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  featuredImage?: string;
};

export type TocEntry = {
  id: string;
  text: string;
  depth: number;
};

export type Article = ArticleMeta & {
  contentHtml: string;
  toc: TocEntry[];
};

function readSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllArticles(): ArticleMeta[] {
  return readSlugs()
    .map((slug) => {
      const fileContents = fs.readFileSync(
        path.join(articlesDirectory, `${slug}.md`),
        "utf8",
      );
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        featuredImage: data.featuredImage as string | undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function resolveEmbeds(content: string): string {
  return content.replace(/\{\{embed:\s*([\w-]+)\s*\}\}/g, (match, name) => {
    const embedPath = path.join(embedsDirectory, `${name}.html`);
    if (!fs.existsSync(embedPath)) {
      throw new Error(`Unknown embed "${name}" referenced (${embedPath} not found)`);
    }
    return fs.readFileSync(embedPath, "utf8");
  });
}

function nodeText(node: Element): string {
  let text = "";
  visit(node, "text", (textNode: Text) => {
    text += textNode.value;
  });
  return text;
}

function extractToc() {
  return (tree: Root, file: VFile) => {
    const toc: TocEntry[] = [];
    visit(tree, "element", (node: Element) => {
      const match = /^h([2-3])$/.exec(node.tagName);
      if (!match) return;
      const id = node.properties?.id;
      if (typeof id !== "string") return;
      toc.push({ id, text: nodeText(node), depth: Number(match[1]) });
    });
    file.data.toc = toc;
  };
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const fileContents = fs.readFileSync(
    path.join(articlesDirectory, `${slug}.md`),
    "utf8",
  );
  const { data, content: rawContent } = matter(fileContents);
  const content = resolveEmbeds(rawContent);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(extractToc)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    featuredImage: data.featuredImage as string | undefined,
    contentHtml: file.toString(),
    toc: (file.data.toc as TocEntry[] | undefined) ?? [],
  };
}
