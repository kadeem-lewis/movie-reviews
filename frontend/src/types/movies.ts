export type Movie = {
  _id: string;
  title: string;
  plot: string;
  poster: string;
  rated: string;
  reviews: Review[];
};

export type Review = {
  _id: string;
  name: string;
  review: string;
  user_id: string;
  movie_id: string;
  date: string;
};
