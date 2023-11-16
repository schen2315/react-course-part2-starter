import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import TypicodeClient, { Todo } from "../services/typicodeClient";

function useTodos() {
  const typicodeInstance = new TypicodeClient();
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: () => typicodeInstance.getTodos(),
    staleTime: 10 * 1000,
  });
  return { todos, error, isLoading };
}

export default useTodos;
