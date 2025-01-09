import dayjs from "dayjs";
import { PostItem } from "../types/post";

export const sortFavorites = {
  created_at: (favorites: PostItem[]): PostItem[] => {
    return favorites.toSorted(
      (a, b) => dayjs(b.created_at).unix() - dayjs(a.created_at).unix()
    );
  },
  points: (favorites: PostItem[]): PostItem[] => {
    return favorites.toSorted((a, b) => b.points - a.points);
  },
  num_comments: (favorites: PostItem[]): PostItem[] => {
    return favorites.toSorted((a, b) => b.num_comments - a.num_comments);
  },
  added_to_favorites: (favorites: PostItem[]): PostItem[] => {
    return favorites;
  },
};
