import axios from "axios";


export const getComboRecommendations = async (itemId: string) => {
const res = await axios.get(`http://localhost:5000/api/order/recommend?itemId=${itemId}`);
return res.data.recommendedItems || [];
};


export const searchFoodItems = async (query: string) => {
const res = await axios.get(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
return res.data.results || [];
};