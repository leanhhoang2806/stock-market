
const uuid = require('uuid');
const moment = require('moment');

class WatchListDAO {
    constructor(pool) {
        this.pool = pool;
    }

    async getWatchListById(watchListId) {
        const result = await this.pool.query('SELECT * FROM watchlists WHERE id = $1', [watchListId]);
        return result.rows;
    }

    async getWatchListByUserId(userId) {
        const result = await this.pool.query('SELECT * FROM watchlists WHERE user_id = $1', [userId]);
        return result.rows;
    }

    async addWatchListByUserId(userId, watchListName, stockNames = []) {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const result = await this.pool.query(
            'INSERT INTO watchlists(id, user_id, watch_list_name, stock_names, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [uuid.v4(), userId, watchListName, JSON.stringify(stockNames), currentTime, currentTime]
        )
        return result.rows;
    }

    async updateStockListById(watchListId, newStockNames) {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const validJsonArray = JSON.stringify(newStockNames);
        const result = await this.pool.query(
            'UPDATE watchlists SET stock_names = stock_names || $1, updated_at = $2 WHERE id = $3 RETURNING *',
            [validJsonArray, currentTime, watchListId]
        )
        return result.rows
    }

    async removeStockByName(watchListId, stockNameToRemove) {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const result = await this.pool.query(
            'UPDATE watchlists SET stock_names = stock_names - $1, updated_at = $2 WHERE id = $3 RETURNING *',
            [stockNameToRemove, currentTime, watchListId]
        )
        return result.rows
    }
}
  
module.exports = {
    WatchListDAO
}; 
  