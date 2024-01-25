// StockSearchModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem } from '@mui/material';
import SearchBar from './SearchBar';
import { removeStockOnWatchList } from '../APIs/watchListApis'

const StockSearchModal = ({ open, onClose, selectedWatchlistName, selectedWatchlistId, stockInWatchList }) => {

  const handleRemoveStock = async (stockNames) => {
    await removeStockOnWatchList({ selectedWatchlistId, stockNames})
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Watchlist {selectedWatchlistName} </DialogTitle>
      <DialogContent>
        {stockInWatchList && <List>
            {stockInWatchList.map((stock) => (
              <ListItem key={stock}>
                <Button variant="outlined" onClick={() => handleRemoveStock(stock)}>
                  {`${stock}  - Remove`}
                </Button>
              </ListItem>
            ))}
          </List>
        }
        <SearchBar open={open} onClose={onClose} selectedWatchlistId={selectedWatchlistId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockSearchModal;
