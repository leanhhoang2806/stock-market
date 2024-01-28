import React from 'react';
import {
    Button
} from '@mui/material';
import PropTypes from 'prop-types';

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

WatchListEdit.propTypes = {
    watchlistName: PropTypes.string.isRequired,
    onAddStock: PropTypes.func.isRequired
}

export default WatchListEdit;