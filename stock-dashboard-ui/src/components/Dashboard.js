import React, { useState, useEffect } from 'react';import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from '@mui/material';

import { addWatchList, getWatchlistByUserId } from '../APIs/watchListApis';
import WatchListEdit from './WatchListEdit'
import StockSearchModal from './StockSearchModal';
import ChartComponent from './Chart';
import websocket from '../sockets/webSocket';


const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [openWatchListPopUp, setOpenWatchListPopUp] = useState(false);
  const [openEditWatchListPopup, setOpenEditWatchListPopup] = useState(false);
  const [watchlistName, setWatchlistName] = useState('');
  const [displaytWatchListName, setDisplayWatchListName] = useState([])
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [socketData, setSocketData] = useState([{
    prices: [],
    stockName: "",
    timeline: []

  }]);
  const getAllWatchList = async () => {
    const rows = await getWatchlistByUserId()
    setDisplayWatchListName(rows)
  }

  useEffect(() => {
    getAllWatchList();
  }, []); 

  const handleViewWatchList = (watchListId) => {
    websocket({watchListId, setSocketData})
  }

  const handleAddWatchlist = async () => {
    setOpenWatchListPopUp(true);
  };

  const handlePopupClose = async () => {
    await getAllWatchList()
    setOpenWatchListPopUp(false);
    setOpenEditWatchListPopup(false)
    setWatchlistName('');
    setSocketData([{
        prices: [],
        stockName: "",
        timeline: []
    
      }])
  };

  const handleSaveWatchlist = async () => {
    setLoading(true)
    await addWatchList(watchlistName)
    await getAllWatchList()
    setLoading(false)
    handlePopupClose();
  };

  const handleAddStock = (selectedWatchlist) => {
    setSelectedWatchlist(selectedWatchlist);
    setOpenEditWatchListPopup(true);
    };

  return (
    <Container maxWidth="lg">
      {loading && <div>Loading...</div>}
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" component="div">
              Dashboard
            </Typography>
            <Typography variant="body1">
              Welcome to stock market data
            </Typography>

            <ChartComponent stockData={socketData} />
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" component="div">
              Search your stocks
            </Typography>

            <Button variant="contained" color="primary" onClick={handleAddWatchlist}>
              Add Watchlist
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" component="div">
                    Edit your Watchlists
                </Typography>
                {displaytWatchListName.map((watchlist, index) => (
                    <WatchListEdit
                        key={index}
                        watchlistName={watchlist.watch_list_name}
                        onAddStock={() => handleAddStock(watchlist)}
                    />
                ))}
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" component="div">
                    View your Watchlists
                </Typography>
                {displaytWatchListName.map((watchlist, index) => (
                    <Button key={index} variant="outlined" onClick={() => handleViewWatchList(watchlist.id)}>
                        {watchlist.watch_list_name}
                    </Button>
                ))}
            </Paper>
        </Grid>
      {/* Watchlist Popup */}
      <Dialog open={openWatchListPopUp} onClose={handlePopupClose}>
        <DialogTitle>Add Watchlist</DialogTitle>
        <DialogContent>
          <TextField
            label="Watchlist Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={watchlistName}
            onChange={(e) => setWatchlistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose}>Cancel</Button>
          <Button onClick={handleSaveWatchlist} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {selectedWatchlist && <StockSearchModal
        open={openEditWatchListPopup}
        onClose={handlePopupClose}
        selectedWatchlistName={selectedWatchlist.watch_list_name}
        selectedWatchlistId={selectedWatchlist.id}
        stockInWatchList={selectedWatchlist.stock_names}
      />}
    </Container>
  );
};

export default Dashboard;
