import Post from "./Post";
import type { PostItem } from "../types/post";

type Props = {
  posts: PostItem[] | undefined;
};

const PostList = (props: Props) => {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 ">
      {props.posts?.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default PostList;
