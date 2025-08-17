import { getArticleBySlug } from "@/lib/api/api";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return <div>Nie znaleziono artykułu</div>;
  }
  {
    article.content.map((block: BlocksContent, index: number) => {
      return <BlocksRenderer key={index} content={block} />;
    });
  }
}
