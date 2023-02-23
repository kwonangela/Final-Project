import axios from "axios";

export const getNews = async () => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=5fd1d886956049c3a7f9b5f3b557635a"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
