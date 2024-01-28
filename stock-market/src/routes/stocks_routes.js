
const express = require('express');
const router = express.Router();

const { handleResult } = require('../middleware/route_level_error');

module.exports = (yahooFinanceAPIManager) => {
    const searchStock = async (req) => {
        const { stockName } = req.params;
        return await yahooFinanceAPIManager.searchMarkets(stockName);
    };
    
    
    router.get('/search/:stockName', handleResult(searchStock));

    return router

};
