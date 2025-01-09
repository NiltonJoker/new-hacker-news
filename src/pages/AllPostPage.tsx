import { useCallback, useState } from "react";
import PostList from "../components/PostList";
import SelectFilterMemorized from "../components/SelectFilter";
import useFetchPosts from "../hooks/useFetchPosts";
import { Posts } from "../types/post";
import { BASE_URL, FILTERS } from "../utils/constants";
import Spinner from "../components/Spinner";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function AllPostPage() {
  const [filter, setFilter] = useState(FILTERS[0].value);

  const getKey = useCallback(
    (index: number, previousPageData: Posts | null) => {
      if (previousPageData && !previousPageData.hits.length) return null;

      // Verificar que el índice no sea mayor que el número total de páginas
      if (previousPageData?.nbPages && index >= previousPageData.nbPages)
        return null;

      // Generar la URL con el filtro y el número de página
      return `${BASE_URL}?query=${filter}&page=${index}`;
    },
    [filter]
  );

  const { data, size, setSize, error } = useFetchPosts<Posts>({
    getKey,
    fetcher,
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const hits = data?.map((postData) => postData.hits).flat() || [];

  if (error) {
    return <p>Error loading posts: {error.message}</p>;
  }

  return (
    <>
      <SelectFilterMemorized<string>
        name="post_filter"
        setFilter={setFilter}
        options={FILTERS}
      />

      <PostList posts={hits} />
      {isLoadingMore ? (
        <Spinner />
      ) : (
        <button
          className="mt-4 p-3 shadow-sm border rounded-md hover:bg-slate-100 transition ease-in-out delay-100"
          onClick={() => setSize(size + 1)}
          disabled={data && size >= data[0]?.nbPages}
        >
          Load More
        </button>
      )}

      
    </>
  );
}
