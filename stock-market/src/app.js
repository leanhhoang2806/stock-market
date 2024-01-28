const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);

const { validateJWT } = require('./middleware/token_validator')
const { WebSocketServer } = require('./sockets/web_sockets')
const { pool } = require('./dao/pools')
const { YahooFinanceAPIManager } = require('./managers/market_data_manager');
const { WatchListManager } = require('./managers/watch_list_manager')
const { ConfigManager } = require('./managers/configuration_manager')

// Configs
app.use(cors());
app.use(express.json());

// initialized all managers
const yahooFinanceAPIManager = new YahooFinanceAPIManager(new ConfigManager());
const watchListManager = new WatchListManager(pool)

// starting web socket server
WebSocketServer.getInstance(server, watchListManager, yahooFinanceAPIManager);


// Routes
const watchlistRoutes = require('./routes/watch_list_routes')(yahooFinanceAPIManager, watchListManager);
const stockRoutes = require('./routes/stocks_routes')(yahooFinanceAPIManager);

// Authed Routes
app.use('/api/v1/watchlist', validateJWT)
app.use('/api/v1/watchlist', watchlistRoutes)
app.use('/api/v1/stocks', validateJWT)
app.use('/api/v1/stocks', stockRoutes)
// Unauthed routes
app.get('/api/health', async (req, res) => {
  res.send(200)
});

// Dockerize the backend
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
