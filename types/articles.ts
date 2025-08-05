type CoverImageType = {
  id: string;
  alternativeText?: string;
  url: string;
  formats: {
    large: {
      url: string;
    };
  };
};

export type ArticlesType = {
  id: string;
  title: string;
  contentText: string;
  coverImage: CoverImageType;
  slug: string;
};
