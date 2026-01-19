import axios from "axios";
import config from "../../../config.json";

const authorizedBlogsApiClient = axios.create({ baseURL: config.blogsApi });

export { authorizedBlogsApiClient };
