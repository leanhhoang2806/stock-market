import api from './mainApi';
import { API_PATHS, AUTH_STORAGE_KEY, USER_ID } from './configs';

const addWatchList = async (watchListName, stockNames = []) => {
    try {
      const response = await api.post(
        API_PATHS.WATCH_LIST,
        {
            userId: USER_ID,
            watchListName,
            stockNames,
        },
        {
          headers: {
            Authorization: `Bearer ${AUTH_STORAGE_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding watchlist:', error.message);
      throw error;
    }
  };

const getWatchlistByUserId = async () => {
    try {
        const response = await api.get(API_PATHS.WATCH_LIST + "user/" + USER_ID, {
            headers: {
            Authorization: `Bearer ${AUTH_STORAGE_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error get watchlist:', error.message);
        throw error;
    }
};

const updateWatchList = async ({watchListId, stockNames }) => {
    try {
        const response = await api.put(
            API_PATHS.WATCH_LIST,
            {
                watchListId,
                stockNames
            },
            {
            headers: {
                Authorization: `Bearer ${AUTH_STORAGE_KEY}`,
            },
            }
        )
        return response.data;
    } catch (error) {
        console.error('Error update watchlist:', error.message);
        throw error;
      }
}

const removeStockOnWatchList = async ({ selectedWatchlistId, stockNames }) => {
    try {
      const response = await api.delete(
        API_PATHS.WATCH_LIST,
        {
          headers: {
            Authorization: `Bearer ${AUTH_STORAGE_KEY}`,
          },
          data: { watchListId: selectedWatchlistId, stockNames },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error delete watchlist:', error.message);
      throw error;
    }
  };

export { 
    addWatchList,
    getWatchlistByUserId,
    updateWatchList,
    removeStockOnWatchList
};
