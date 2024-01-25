
const express = require('express');
const router = express.Router();
const { handleResult } = require('../middleware/route_level_error');
const { 
    validateWatchlistPayload,
    validateUpdateWatchlistPayload
 } = require('../middleware/payload_validator')


module.exports = (yahooFinanceAPIManager, watchListManager) => {
    const getWatchListById = async (req, res, next) => {
        const { watchListId } = req.params;
        return await watchListManager.getWatchListById(watchListId);
      };
    
    const getWatchListByUserId = async (req, res, next) => {
        const { userId } = req.params;
        return await watchListManager.fetchWatchListsByUserId(userId);
    }
    
    const addWatchList = async (req, res, next) => {
        const { userId, watchListName, stockIds } = req.body;
        return await watchListManager.addWatchListByUserId(userId, watchListName, stockIds)
    }
    
    const updateWatchList = async (req, res, next) => {
        const { watchListId, stockNames } = req.body
        await yahooFinanceAPIManager.verifyStockExistence(stockNames)
        return await watchListManager.updateStockListById(watchListId, stockNames)
    }
    
    const deleteStockWatchList = async (req, res, next) => {
        const { watchListId, stockNames } = req.body
        return await watchListManager.removeStockByName(watchListId, stockNames)
    }
    
    
    // Route order matters. Do not rearrange
    router.get('/user/:userId', handleResult(getWatchListByUserId));
    router.get('/:watchListId', handleResult(getWatchListById));
    router.post('/', validateWatchlistPayload, handleResult(addWatchList))
    router.put('/', validateUpdateWatchlistPayload, handleResult(updateWatchList))
    router.delete('/', validateUpdateWatchlistPayload, handleResult(deleteStockWatchList))

    return router
};
