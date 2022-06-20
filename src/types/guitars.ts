type GuitarType = 'acoustic' | 'electric' | 'ukulele';

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: GuitarType;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
};

export type Review = {
  advantage: string;
  comment: string;
  createAt: string;
  disadvantage: string;
  guitarId: number;
  id: string;
  rating: number;
  userName: string;
};

export type NewUserReview = {
  advantage: string;
  comment: string;
  disadvantage: string;
  guitarId: number;
  rating: number;
  userName: string;
};

type WithReviews = {
  reviews: Review[];
};

export type GuitarWithReviews = Guitar & WithReviews;
