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
=======

  return (
    <div className="max-w-6xl mx-auto px-10">
      <h1 className="text-5xl font-bold w-4xl  mx-auto py-10">
        {article.title}
      </h1>
      <div className="relative w-full h-100">
        <Image
          src={STRAPI_URL + article.coverImage.url}
          fill
          alt={article.coverImage.alternativeText}
          style={{ objectFit: "cover" }}
        />
      </div>

      {article.content.map((block: any, index: number) => {
        switch (block.__component) {
          case "text-block.text-block":
            return <BlocksRenderer key={index} content={block.text} />;

          case "image-block.image-block":
            return (
              <div key={index}>
                {block.image?.url && (
                  <Image
                    src={STRAPI_URL + block.image.url}
                    alt={block.image.alternativeText || ""}
                    height={200}
                    width={200}
                  />
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
>>>>>>> 9af7fd1fba94e54dba6153312c3790419bc5485d
}
