import { useState } from "react";
import PostContext, { PostContextType } from "./PostContext";
import { PostItem } from "../types/post";
import { getFavorites, toggleFavorite } from "../utils/localFavorites";
import { ReactNode } from "react";

export default function PostProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<PostContextType["favorites"]>(() =>
    getFavorites()
  );

  const handleFavorite = (post: PostItem) => {
    const newFavorites = toggleFavorite(post);

    setFavorites(newFavorites);
  };

  return (
    <PostContext.Provider
      value={{
        favorites,
        handleFavorite,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
