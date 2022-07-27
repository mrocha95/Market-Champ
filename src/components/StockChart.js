// import logo from './logo.svg';
// import './App.css';
import React from "react";
import axios from "axios";

function StockChart(props) {
  // console.log(params);
  const [data, setData] = React.useState({});
  const [time, setTime] = React.useState("6m");

  const displayData = async () => {
    let response = await axios.get(
      `http://localhost:4000/data/${props.ticker}/${time}`
    );
    setData(response.data);
    console.log(response.data);
  };

  React.useEffect(
    function () {
      if (props.ticker) {
        displayData();
      }
    },
    [props.ticker]
  );

  const height = 700;
  const width = 900;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  return (
    <div className="StockChart">
      <h1>{data.ticker}</h1>
      <button>1d</button>
      <button>1w</button>
      <button>1m</button>
      <button>6m</button>
      <button>1y</button>
    </div>
  );
}

export default StockChart;
