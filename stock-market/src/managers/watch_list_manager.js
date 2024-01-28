
const { WatchListDAO } = require('../dao/watch_list')

class WatchListManager {
    constructor(pool) {
        this.WatchListDAO = new WatchListDAO(pool);
    }
  
    async fetchWatchListsByUserId(userId) {
        try {
            const watchLists = await this.WatchListDAO.getWatchListByUserId(userId);
            return watchLists;
        } catch (err) {
            console.error(err);
            throw new Error(`Error fetching watch list for userId ${userId} from the database`);
        }
    }

    async getWatchListById(watchListId) {
        try {
            const watchList = await this.WatchListDAO.getWatchListById(watchListId);
            return watchList;
        } catch (err) {
            console.error(err);
            throw new Error(`Error fetching watch list Id ${watchListId}`);
        }
    }

    async addWatchListByUserId(userId, watchListName, stockIds) {
        try {
            const rows = await this.WatchListDAO.addWatchListByUserId(userId, watchListName, stockIds);
            return rows;
        } catch (err) {
            console.error(err);
            throw new Error(`Error add ${watchListName} for userId ${userId} to the database`);
        }
    }

    async updateStockListById(watchlistId, stockNames) {
        try {
            const rows = await this.WatchListDAO.updateStockListById(watchlistId, stockNames);
            return rows
        } catch (err){
            console.log(err)
            throw new Error(`Error update ${stockNames} for watch list id ${watchlistId} to the database`);
        }
    }

    async removeStockByName(watchListId, stockToRemove) {
        try {
            const rows = await this.WatchListDAO.removeStockByName(watchListId, stockToRemove);
            return rows
        } catch (err){
            console.log(err)
            throw new Error(`Error remove ${stockToRemove} for watch list id ${watchListId} to the database`);
        }
    }
}
  
module.exports = {
    WatchListManager
};
  