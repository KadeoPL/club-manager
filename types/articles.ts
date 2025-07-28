export type ArticlesType = {
  id: string;
  title: string;
  contentText: string;
  coverImage: CoverImageType;
};

type CoverImageType = {
  id: string;
  alternativeText?: string;
  url: string;
};
