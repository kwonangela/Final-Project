import api from "./auth.js";

export const getSubs = async () => {
  try {
    const response = await api.get("/subs/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSub = async (id) => {
  try {
    const response = await api.get(`/subs/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSub = async (sub) => {
  try {
    const response = await api.post("/subs/", sub);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSubs = async (id, sub) => {
  try {
    const response = await api.put(`/subs/${id}/`, sub);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSubs = async (id) => {
  try {
    const response = await api.delete(`/subs/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
