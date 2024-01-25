const WebSocket = require('ws');

class WebSocketServer {
  constructor(server, watchListManager, yahooFinanceAPIManager) {
    this.wss = new WebSocket.Server({ noServer: true });
    this.watchListManager = watchListManager;
    this.yahooFinanceAPIManager = yahooFinanceAPIManager;
    this.socketWatchlistId = null;

    this.wss.on('connection', async (socket, request) => {
        this.handleConnection(socket, request);
    });

    server.on('upgrade', (request, socket, head) => {
      this.wss.handleUpgrade(request, socket, head, (ws) => {
        this.wss.emit('connection', ws, request, (socket) => {
          ws.on('message', (message) => {
            console.log('Received message:', message);
          });
        });
      });
    });

    this.updateInterval = setInterval(() => {
        this.sendDataToClients();
      }, 1*60*1000);
  }

  async handleConnection(socket, request) {
    const watchlistId = new URL(request.url, 'http://localhost:5000').searchParams.get('watchlist_id');
    this.socketWatchlistId = watchlistId;
    const results = await this.getDataForWatchlist(watchlistId);
    socket.send(JSON.stringify({ results }));
  }

  async sendDataToClients() {
    this.wss.clients.forEach(async (client) => {
      const results = await this.getDataForWatchlist(this.socketWatchlistId);
      client.send(JSON.stringify({ results }));
    });
  }

  async getDataForWatchlist(watchlistId) {
    const watchLists = await this.watchListManager.getWatchListById(watchlistId);
    const stocks = watchLists[0].stock_names;
    const stockPrices = await this.yahooFinanceAPIManager.fetchDataForStocks(stocks, "1h");

    return stockPrices.map((stock) => {
      return {
        stockName: stock.stockName,
        prices: Object.values(stock.data.body).map(item => item.high),
        timeline: Object.keys(stock.data.body)
      };
    });
  }

  static getInstance(server, watchListManager, yahooFinanceAPIManager) {
    if (!this.instance) {
      this.instance = new WebSocketServer(server, watchListManager, yahooFinanceAPIManager);
    }
    return this.instance;
  }
}

module.exports = {
    WebSocketServer
};
