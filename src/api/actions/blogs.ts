import * as BlogsRepository from "../endpoints/blogs";

export const getFamousBlogs = async () => {
  try {
    const famousBlogs = await BlogsRepository.getFamousBlogs();
    return famousBlogs.data;
  } catch (err) {
    console.log("Unable to Fetch Famous Blogs : ", err);
    return null;
  }
};

export const submitBlogIdea = async (ideaPayload: any) => { 
  try {
    const response = await BlogsRepository.submitBlogIdea(ideaPayload);
    return response.data;
  } catch (err) {
    console.log("Unable to Submit Blog Idea : ", err);
    return null;
  }
}
