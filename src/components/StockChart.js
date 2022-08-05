// import logo from './logo.svg';
// import './App.css';
import React from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { get, post, remove } from "../services/service";

function StockChart(props) {
  // console.log(params);
  // const [data, setData] = React.useState({});
  const [ticker, setTicker] = React.useState("");
  const [currentPrice, setCurrentPrice] = React.useState("");
  const [series, setSeries] = React.useState([{ data: [] }]);
  const [timespan, setTimespan] = React.useState("6m");

  const params = useParams();

  console.log("params", params);

  const displayData = async () => {
    let response = await get(`/data/${params.input}/${timespan}`);
    // setData(response.data.results);
    setTicker(response.data.ticker);
    setCurrentPrice(response.data.results[response.data.results.length - 1].c);
    // setSeries({
    //   data: response.data.results.map(function (index) {
    //     return [index.t, [index.o, index.h, index.l, index.c]];
    //   }),
    // });

    const prices = response.data.results.map((index) => ({
      x: index.t,
      y: [index.o, index.h, index.l, index.c],
    }));
    setSeries([
      {
        data: prices,
      },
    ]);
    // console.log(response.data.results);
  };

  // console.log(series);
  React.useEffect(
    function () {
      displayData();
      // if (props.ticker) {

      // }
    },
    [params, timespan]
  );

  const chart = {
    options: {
      chart: {
        type: "candlestick",
        // height: 350,
      },
      // title: {
      //   text: props.ticker,
      //   align: "left",
      // },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  return (
    <div className="stock-chart">
      <h1>
        {currentPrice && ticker} <span>{currentPrice}</span>
      </h1>
      {series && (
        <Chart
          options={chart.options}
          series={series}
          type="candlestick"
          width="100%"
          height={320}
        />
      )}
      <div className="button-container">
        <button onClick={() => setTimespan("1d")}>1d</button>
        <button onClick={() => setTimespan("1w")}>1w</button>
        <button onClick={() => setTimespan("1m")}>1m</button>
        <button onClick={() => setTimespan("6m")}>6m</button>
        <button onClick={() => setTimespan("1y")}>1y</button>
      </div>

      <Posts ticker={ticker} />
    </div>
  );
}

export default StockChart;
