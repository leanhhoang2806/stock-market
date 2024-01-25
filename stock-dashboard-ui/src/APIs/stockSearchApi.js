import axios from 'axios';
import { API_PATHS, AUTH_STORAGE_KEY } from './configs';

const fetchDataFromStocksSearch = async (symbol) => {
  try {
    const response = await axios.get(API_PATHS.STOCKS_SEARCH + symbol, {
      headers: {
        Authorization: `Bearer ${AUTH_STORAGE_KEY}`,
      },
    });
    return response.data.body;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; 
  }
};

export { fetchDataFromStocksSearch };
