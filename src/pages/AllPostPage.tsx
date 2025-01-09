import SelectFilterMemorized from "../components/SelectFilter";
import PostList from "../components/PostList";
import { useState } from "react";
import useSWR from "swr";
import { Posts } from "../types/post";
import { BASE_URL, FILTERS } from "../utils/constants";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function AllPostPage() {
  const [filter, setFilter] = useState(FILTERS[0].value);

  const { data, error, isLoading, isValidating } = useSWR<Posts>(
    `${BASE_URL}?query=${filter}`,
    fetcher
  );

  if (error) {
    return <p>Error to Fetching...</p>;
  }

  return (
    <>
      <SelectFilterMemorized setFilter={setFilter} options={FILTERS} />

      {isValidating ? <p>Fetching...</p> : null}
      <PostList posts={data?.hits} />
      {isLoading && <p>Loading...</p>}
    </>
  );
}
