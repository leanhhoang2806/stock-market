const axios = require('axios');

class YahooFinanceAPIManager {
  constructor(configManager) {
    this.apiKey = configManager.getApiKey();
    this.apiHost = configManager.getApiHost();
    this.baseURL = 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets';
  }

  async searchMarkets(query) {
    const options = {
      method: 'GET',
      url: `${this.baseURL}/search`,
      params: { search: query },
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost
      }
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyStockExistence(query) {
    try {
        const result = await this.searchMarkets(query)
        return result.body.find(stock => stock.symbol === query || query.toUpperCase() );
    } catch (error) {
        throw error;
    }
  }

  async fetchData(symbol, interval, diffandsplits) {
    const options = {
      method: 'GET',
      url: `${this.baseURL}/stock/history`,
      params: {
        symbol,
        interval,
        diffandsplits,
      },
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }

  async fetchDataForStocks(stockNames, interval="5m", diffandsplits=false) {
    try {
      const results = await Promise.all(
        stockNames.map(async (stockName) => {
          const data = await this.fetchData(stockName, interval, diffandsplits);
          return { stockName, data };
        })
      );

      return results;
    } catch (error) {
      console.error('Error fetching data for stocks:', error.message);
      throw error;
    }
  }

}

module.exports = {
    YahooFinanceAPIManager
}