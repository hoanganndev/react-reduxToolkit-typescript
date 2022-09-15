import { instance_jsonplaceholder } from "./axiosClient";

const fetchPostsData = async (limit: number) => {
  const res = await instance_jsonplaceholder.get<any[]>(`/posts?_limit=${limit}`);
  return res.data;
};

export { fetchPostsData };
