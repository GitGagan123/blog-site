import { authorizedBlogsApiClient } from "./api";

export const getFamousBlogs = () =>
  authorizedBlogsApiClient.get("/blogs/trending");
