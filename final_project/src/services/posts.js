import { authApi } from "./auth.js";

export const getPosts = async () => {
  try {
    const response = await authApi.get("/post/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await authApi.get(`/post/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await authApi.post("/post/", post);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await authApi.put(`/post/${id}/`, post);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await authApi.delete(`/post/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
