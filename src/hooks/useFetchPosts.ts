import { useCallback, useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";

const GET_DATA_BEFORE_SCROLL = 10;

interface Props<T> {
  getKey: (index: number, previousPageData: T | null) => string | null;
  fetcher: (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => Promise<T>;
}

export default function useFetchPosts<T>({ getKey, fetcher }: Props<T>) {
  const { data, isLoading, isValidating, size, setSize, error } =
    useSWRInfinite<T>(getKey, fetcher);

  const debounceTimeout = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    const bottom =
      document.documentElement.scrollHeight - GET_DATA_BEFORE_SCROLL <=
      document.documentElement.scrollTop + window.innerHeight;

    if (bottom && !isLoading) {
      // Cancelamos cualquier temporizador previo
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        setSize((size) => size + 1); // Incrementamos el tamaño para cargar más datos
      }, 300); // Tiempo de debounce (300 ms)
    }
  }, [isLoading, setSize]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [handleScroll]);

  return {
    data,
    isLoading,
    isValidating,
    size,
    setSize,
    error,
  };
}
