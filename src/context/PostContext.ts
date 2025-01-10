import { createContext } from "react";
import { PostItem } from "../types/post";

export interface PostContextType {
  favorites: PostItem[];
  handleFavorite: (post: PostItem) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export default PostContext;
