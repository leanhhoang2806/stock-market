

Project to display the stock market data

# Setup
1. Obtain YahooFinanceAPI credential from rapid api. 
https://rapidapi.com/sparior/api/yahoo-finance15

2. Add API key into `stock-market/.env`
Add key to `YAHOO_API_KEY`
Add host to `YAHOO_API_HOST`

# Starting backend server
1. Go to backend directory `cd stock-market`
2. Install depedencies `npm install`
3. Starting all backend components: `docker-compose down -v && docker-compose up -d --build`

# Starting the front-end component
1. Go back to root directory
2. Go to UI component: `cd stock-dashboard-ui/ `
3. Install dependencies `npm install`
4. Start the server: `npm start`
5. Open the browser and go to `localhost:30000`

# How to use the website
!!!! Search and add stock will take some time due to external API call !!!!

1. Add watch list (top right)
2. To add stock: choose the watch list from Edit
3. To watch stock: click on watch list in View