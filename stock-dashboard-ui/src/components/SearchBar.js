// SearchBar.js
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, List, ListItem } from '@mui/material';
import { fetchDataFromStocksSearch } from '../APIs/stockSearchApi'
import {updateWatchList} from '../APIs/watchListApis'

const SearchBar = ({ onClose, selectedWatchlistId }) => {
    const [stockData, setStockData] = useState([]);
    const [searchSymbol, setSearchSymbol] = useState('');
    const handleSearch =  async () => {
        const result = await fetchDataFromStocksSearch(searchSymbol)
        setStockData(result)
    }

    const handleClick = async (symbol) => {
        await updateWatchList({
            watchListId: selectedWatchlistId,
            stockNames: symbol
        })
        onClose()
    }
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchSymbol}
        onChange={(e) => setSearchSymbol(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      {stockData.length > 0 && (
        <List>
          {stockData.map((stock, index) => (
            <ListItem key={index}>
                <Button variant="outlined" onClick={() => handleClick(stock.symbol)}>
                    {`${stock.symbol} - ${stock.name}`}
                 </Button>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

SearchBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedWatchlistId: PropTypes.string.isRequired,
};

export default SearchBar;
