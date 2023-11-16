import axios, { AxiosInstance } from "axios";
import createAxiosObject from "./axios";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

class TypicodeClient {
  private endpoint: string = "https://jsonplaceholder.typicode.com/";
  axiosObject: AxiosInstance = createAxiosObject(this.endpoint);

  constructor() {}

  getPosts(params: { [key: string]: string } = {}) {
    return this.axiosObject
      .get<Post[]>("/posts", {
        params: params,
      })
      .then((res) => res.data);
  }

  getTodos(params: { [key: string]: string } = {}) {
    return this.axiosObject
      .get<Todo[]>("/todos", {
        params: params,
      })
      .then((res) => res.data);
  }

  postTodos(todo: Todo) {
    return this.axiosObject.post<Todo>("/todos", todo).then((res) => res.data);
  }
}

export default TypicodeClient;
