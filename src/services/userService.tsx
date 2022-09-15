import { instance_reqres } from "./axiosClient";
interface ResUser {
  name: string;
  job: string;
  updatedAt: string;
}
const fetchUsersData = async (page: number) => {
  const res = await instance_reqres.get(`/api/users?page=${page}`);
  return res.data;
};

const createNewUser = async (name: string, job: string) => {
  const res = await instance_reqres.post("/api/users", { name, job });
  return res.data;
};

const updateUser = async (name: string, job: string) => {
  const res = await instance_reqres.put<ResUser>("/api/users/2", { name, job });
  return res.data;
};

const loginUser = async (email: string, password: string) => {
  const res = await instance_reqres.post("/api/login", { email, password });
  return res.data;
};

export { fetchUsersData, createNewUser, updateUser, loginUser };
