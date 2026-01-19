import { authorizedBlogsApiClient } from "./api";

export const getFamousBlogs = () =>
  authorizedBlogsApiClient.get("/blogs/trending");

export const submitBlogIdea = (ideaPayload: any) =>
  authorizedBlogsApiClient.post("/blogs/idea", ideaPayload);
