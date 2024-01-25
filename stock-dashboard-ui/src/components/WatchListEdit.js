import React from 'react';
import {
    Button
} from '@mui/material';

const WatchListEdit = ({ watchlistName, onAddStock }) => {
    const handleAddStockClick = () => {
        onAddStock(watchlistName);
    };

    return (
        <Button variant="outlined" onClick={handleAddStockClick}>
            {watchlistName}
        </Button>
    );
};

export default WatchListEdit;