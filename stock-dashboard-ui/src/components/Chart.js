import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import PropTypes from 'prop-types';


const getHoursAndMinutesOfDay = (epochTimes) => {
    return epochTimes.map(epochTime => {
      return new Date(epochTime * 1000);
    });
  }


const ChartComponent = ({stockData}) => {

  const chartData = stockData.map(stock => ({
    curve: "linear",
    data: stock.prices,
    name: stock.stockName,
  }));

  const valueFormatter = (date) =>
  date.toLocaleDateString('en-EN', {
    month: '2-digit',
    day: '2-digit',
  });

  const xAxisCommon = {
    data: getHoursAndMinutesOfDay(stockData[0]?.timeline ),
    scaleType: 'time',
    valueFormatter
  }
  return (
    <LineChart
    xAxis={[
        {
            ...xAxisCommon,
            id: 'bottomAxis',
            scaleType: 'point',
            tickInterval: (time) => time.getHours() === 0,
          },

          {
            ...xAxisCommon,
            id: 'bottomAxis',
            scaleType: 'point',
          },
      ]}
      series={chartData}
      width={700}
      height={300}
      bottomAxis='bottomAxis'
    />
  );
};

ChartComponent.propTypes = {
  stockData: PropTypes.array.isRequired, // Adjust the type accordingly
};

export default ChartComponent;
