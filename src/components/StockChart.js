// import logo from './logo.svg';
// import './App.css';
import React, { useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { get, post, remove } from "../services/service";
import * as dayjs from "dayjs";
import Login from "./Login";

function StockChart() {
  const [name, setName] = React.useState("");
  const [ticker, setTicker] = React.useState("");
  const [currentPrice, setCurrentPrice] = React.useState("");
  const [previousClose, setPreviousClose] = React.useState("");
  const [series, setSeries] = React.useState([{ data: [] }]);
  const [timespan, setTimespan] = React.useState("6mo");
  const [slices, setSlices] = React.useState([0, 0]);

  const params = useParams();

  const displayData = async () => {
    let response = await get(`/data/${params.input}/${timespan}`);
    let response2 = await get(`/details/${params.input}`);
    // console.log(response2.data.quoteResponse.result[0]);

    setName(response2.data.quoteResponse.result[0].longName);

    setTicker(response.data.chart.result[0].meta.symbol);
    setCurrentPrice(
      response.data.chart.result[0].meta.regularMarketPrice.toFixed(2)
    );
    setPreviousClose(
      response.data.chart.result[0].meta.chartPreviousClose.toFixed(2)
    );

    timespan === "1d" ? setSlices([6, 12]) : setSlices([0, 6]);

    const quote = response.data.chart.result[0].indicators.quote[0];

    const prices = response.data.chart.result[0].timestamp.map(
      (timestamp, index) => ({
        x: new Date(timestamp * 1000),
        y: [
          quote.open[index],
          quote.high[index],
          quote.low[index],
          quote.close[index],
        ].map((number) => {
          return number ? +number.toFixed(2) : null;
        }),
      })
    );

    setSeries([
      {
        data: prices,
      },
    ]);
  };

  const stonksUrl = `/details/${params.input}`;
  async function getStonks() {
    const response = await get(stonksUrl);
    // console.log(response);
    return response;
  }

  useEffect(() => {
    let timeoutId;
    async function getLatestPrice() {
      try {
        const data = await getStonks();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      timeoutId = setTimeout(getLatestPrice, 1000);
    }
    getLatestPrice();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    displayData();
  }, [params, timespan]);

  const chart = {
    options: {
      chart: {
        type: "candlestick",
        // height: 350,
      },

      xaxis: {
        type: "category",
        labels: {
          rotate: 0,
          showDuplicates: false,
          formatter: function (val) {
            return dayjs(val)
              .format("MMM DD HH:mm")
              .substring(slices[0], slices[1]);
          },
        },
        tickAmount: 6,
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
      <div className="stock-name">{name}</div>
      <h1>
        {currentPrice && ticker} <span>{currentPrice}</span>
        <span
          className="price-change"
          style={
            (currentPrice - previousClose).toFixed(2) < 0
              ? { color: "red" }
              : { color: "green" }
          }
        >
          {(currentPrice - previousClose).toFixed(2)} (
          {(
            ((currentPrice - previousClose).toFixed(2) / previousClose) *
            100
          ).toFixed(2)}
          %)
        </span>
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
        <button onClick={() => setTimespan("1wk")}>1w</button>
        <button onClick={() => setTimespan("1mo")}>1m</button>
        <button onClick={() => setTimespan("6mo")}>6m</button>
        <button onClick={() => setTimespan("1y")}>1y</button>
      </div>

      <Posts ticker={ticker} />
    </div>
  );
}

export default StockChart;
