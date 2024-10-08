import React, { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "./smartreport.css";
import "./smartreport.css";


const getColorName = (value, min, max) => {
  const percentage = ((value - min) / (max - min)) * 100;
  if (percentage <= 20) {
    return "Panic";
  } else if (percentage <= 40) {
    return "Abnormal - Y";
  } else if (percentage <= 60) {
    return "Normal";
  } else if (percentage <= 80) {
    return "Abnormal - O";
  } else {
    return "Panic";
  }
};

const WhiteBloodCellCount = () => {
  const min = 400;
  const max = 10500;
  const colors = ["red", "yellow", "green", "orange", "red"];
  const [value, setValue] = useState(400); // Initial value
  const percentage = ((value - min) / (max - min)) * 100;
  const colorName = getColorName(value, min, max); // Using getColorName function

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="white-blood-cell-count-container">
      <div className="color-box-container">
        <div className="ncdjjdu88">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleSliderChange}
            className="slider"
          />
          <FileDownloadIcon
            className="arrow-icon34f"
            style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
          />
        </div>
        <div
          className="color-box"
          style={{
            background: `linear-gradient(to right, ${colors[0]} 0%, ${colors[1]} 25%, ${colors[2]} 50%, ${colors[3]} 75%, ${colors[4]} 100%)`, // Fixed index in colors array
            width: "100%",
            position: "relative",
            height: "30px",
          }}
        ></div>

        <div className="range-values">
          <span className="start-value">{min} /uL</span>

          <span className="color-name">{colorName}</span>


          <span className="end-value">{max} /uL</span>
        </div>

        <span
          className="current-value"
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
        >
          {value}
        </span>
      </div>

      <div className="info">
      </div>
    </div>
  );
};

const RedBloodCellCount = () => {
  const min = 3900000;
  const max = 5500000;
  const colors = ["red", "yellow", "green", "orange", "red"];
  const [value, setValue] = useState(400); // Initial value
  const percentage = ((value - min) / (max - min)) * 100;
  const colorName = getColorName(value, min, max); // Using getColorName function

  const handleSliderChange2 = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="white-blood-cell-count-container">
      <div className="color-box-container">
        <div className="ncdjjdu88">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleSliderChange2}
            className="slider"
          />
          <FileDownloadIcon
            className="arrow-icon34f"
            style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
          />
        </div>
        <div
          className="color-box"
          style={{
            background: `linear-gradient(to right, ${colors[0]} 0%, ${colors[1]} 25%, ${colors[2]} 50%, ${colors[3]} 75%, ${colors[4]} 100%)`, // Fixed index in colors array
            width: "100%",
            position: "relative",
            height: "30px",
          }}
        ></div>

        <div className="range-values">
          <span className="start-value">{min} /uL</span>
          <span className="color-name">{colorName}</span>


          <span className="end-value">{max} /uL</span>
        </div>

        <span
          className="current-value"
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
        >
          {value}
        </span>
      </div>

      {/* <div className="info">
      </div> */}
    </div>
  );
};

const Hemoglobin = () => {
  const min = 12;
  const max = 16;
  const colors = ["red", "yellow", "green", "orange", "red"];
  const [value, setValue] = useState(400); // Initial value
  const percentage = ((value - min) / (max - min)) * 100;
  const colorName = getColorName(value, min, max); // Using getColorName function

  const handleSliderChange3 = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="white-blood-cell-count-container">
      <div className="color-box-container">
        <div className="ncdjjdu88">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleSliderChange3}
            className="slider"
          />

          <FileDownloadIcon
            className="arrow-icon34f"
            style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
          />
        </div>
        <div
          className="color-box"
          style={{
            background: `linear-gradient(to right, ${colors[0]} 0%, ${colors[1]} 25%, ${colors[2]} 50%, ${colors[3]} 75%, ${colors[4]} 100%)`, 
            width: "100%",
            position: "relative",
            height: "30px",
          }}
        ></div>

        <div className="range-values">
          <span className="start-value">{min} g/dL</span>
          <span className="color-name">{colorName}</span>


          <span className="end-value">{max} g/dL</span>
        </div>

        <span
          className="current-value"
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
        >
          {value}
        </span>
      </div>
<br />

      {/* <div className="info">
      </div> */}
    </div>
  );
};

function SmartReport() {
  //   const whiteBloodCellCount = 6000;
  const redBloodCellCount = 4500000;
  const hemoglobin = 14;

  return (
    <div className="appointment">
      <div className="h_head">
        <h4>Normal Results</h4>
      </div>

      <h4 className="what-does-it-mean">What does it mean?</h4>
      <br />
      <div className="jfnn6k9">
        <div className="result-container">
          <div className="color-green"></div>
          <div>
            <h5>Normal</h5>
          </div>
        </div>

        <div className="result-container">
          <div className="color-yellow"></div>
          <div>
            <h5>Abnormal Yellow</h5>
          </div>
        </div>

        <div className="result-container">
          <div className="color-orange"></div>
          <div>
            <h5> Abnormal Orange</h5>
          </div>
        </div>

        <div className="result-container">
          <div className="color-red"></div>
          <div>
            <h5>Panic</h5>
          </div>
        </div>
      </div>
      <br />

      <div className="card_7juj_head">
        <div className="card_7juj">
          <div className="cmwjdjwsud66">
            <h4>White Blood Cells Count</h4>
          </div>

          <WhiteBloodCellCount />
        </div>

        <div className="card_7juj">
          <div className="cmwjdjwsud66">
            <h4>Red Blood Cells Count</h4>
          </div>
          <RedBloodCellCount />
        </div>

        <div className="card_7juj">
          <div className="cmwjdjwsud66">
            <h4>Hemoglobin</h4>
          </div>
          <Hemoglobin />
        </div>
      </div>
    </div>
  );
}

export default SmartReport;

