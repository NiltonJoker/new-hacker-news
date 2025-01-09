import { useState } from "react";
import PostList from "../components/PostList";
import SelectFilterMemorized from "../components/SelectFilter";
import { usePost } from "../hooks/usePost";
import { ORDER_BY } from "../utils/constants";
import { sortFavorites } from "../utils/sortFavorites";
import { OrderBy } from "../types";

export default function FavoritePosts() {
  const { favorites } = usePost();

  const [filter, setFilter]  = useState<OrderBy>(ORDER_BY[0].value);

  if(favorites.length === 0) {
    return <p className="text-center">No favorite posts</p>;
  }

  const filteredFavorites = sortFavorites[filter](favorites);

  return (
    <>
      <SelectFilterMemorized<OrderBy> name="orderby" setFilter={setFilter} options={ORDER_BY} />

      <PostList posts={filteredFavorites} />
    
    </>
  );
}
