import { API_BASE_URL } from "../config";

export const getComboRecommendations = async (itemId: string) => {
    const res = await axios.get(`${API_BASE_URL}/api/food/recommend?itemId=${itemId}`);
    return res.data.recommendedItems || [];
};


export const searchFoodItems = async (query: string) => {
    const res = await axios.get(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
    return res.data.results || [];
};