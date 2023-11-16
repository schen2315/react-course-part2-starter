import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import TypicodeClient, { Post } from "../services/typicodeClient";

interface PostQuery {
  pageSize: number;
}

const typeicodeInstance = new TypicodeClient();

function usePosts(query: PostQuery) {
  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      typeicodeInstance.getPosts({
        _start: ((pageParam - 1) * query.pageSize).toString(),
        _limit: query.pageSize.toString(),
      }),
    staleTime: 10 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  return { posts, error, isLoading, fetchNextPage, isFetchingNextPage };
}

export default usePosts;
