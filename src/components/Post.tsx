import HeartFill from "../assets/heart-fill.svg";
import Heart from "../assets/heart.svg";
import Clock from "../assets/clock.svg";

import { getDateFromNow } from "../utils/dayjs";
import { PostItem } from "../types/post";
import { usePost } from "../hooks/usePost";

type Props = {
  post: PostItem;
};

export default function Post({ post }: Props) {
  const { favorites, handleFavorite } = usePost();

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleFavorite(post);
  };

  const isFavorited = favorites.some(
    (favorite) => favorite?.objectID === post.objectID
  )
    ? HeartFill
    : Heart;

  return (
    <div className="flex bg-white shadow-md hover:opacity-80 rounded-sm  overflow-hidden">
      <a
        href={post.story_url ? post.story_url : post.url}
        target="_blank"
        rel="noreferrer"
        className="inline-block w-full no-underline text-white hover:text-white"
      >
        <div className="text-left p-4 flex gap-2 flex-col flex-1">
          <div className="flex items-center gap-1">
            <img src={Clock} alt="Clock Icon" className="w-4 h-4" />
            <p className="text-[10px] text-gray-400 p-0 m-0">
              {getDateFromNow(post.created_at)}
              <span className="font-bold"> by {post.author}</span>
            </p>
          </div>
          <p className="text-sm text-gray-800 p-0 m-0">
            {post.story_title ? post.story_title : post.title}
          </p>
        </div>
      </a>
      <button
        className="justify-self-end w-14 bg-gray-200 p-2 flex items-center justify-center"
        onClick={toggleFavorite}
      >
        <img className="w-6 h-6" src={isFavorited} alt="Heart icon" />
      </button>
    </div>
  );
}
