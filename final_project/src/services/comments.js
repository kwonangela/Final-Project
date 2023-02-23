import { authApi } from "./auth.js";

export const getComments = async () => {
  try {
    const response = await authApi.get("/comments/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComment = async (id) => {
  try {
    const response = await authApi.get(`/comments/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createComment = async (comment) => {
  try {
    const response = await authApi.post("/comments/", comment);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateComment = async (id, comment) => {
  try {
    const response = await authApi.put(`/comments/${id}/`, comment);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await authApi.delete(`/comments/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
