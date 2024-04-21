/* eslint-disable no-useless-catch */
import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID;

/**
 * Fetch images from Google Custom Search API based on the given query.
 *
 * @param {string} query - The search query for images.
 * @returns {Promise<Array<any>>} - A promise that resolves to an array of image items.
 * @throws {Error} - Throws an error if the API request fails.
 */
const fetchImages = async (query: string): Promise<Array<any>> => {
  try {
    const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        key: API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: query,
        searchType: "image",
      },
    });
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

export default fetchImages;
