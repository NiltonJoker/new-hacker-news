import PostList from "../components/PostList";
import { usePost } from "../hooks/usePost";

export default function FavoritePosts() {
  const { favorites } = usePost();

  if(favorites.length === 0) {
    return <p className="text-center">No favorite posts</p>;
  }

  return <PostList posts={favorites} />;
}
