import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// Parent Card component
const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-container">
      {!expanded ? (
        <CompactCard param={props} setExpanded={setExpanded} />
      ) : (
        <ExpandedCard param={props} setExpanded={setExpanded} />
      )}
    </div>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;

  const cardStyle = {
    backgroundImage: param.color.backgroundImage
      ? `url(${param.color.backgroundImage})`
      : param.color.backGround,
    boxShadow: param.color.boxShadow,
  };

  return (
    <motion.div
      className="CompactCard"
      style={cardStyle}
      layoutId={`compact-${param.id}`} // Use a unique layoutId
      onClick={() => setExpanded(true)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="content_pp">
        <span className="title_pl">{param.title}</span>
        <div className="detail">
          <Png />
        </div>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const isChartCard = param.title === "Vitals" || param.title === "Input Output Chart";

  const data = {
    options: {
      chart: {
        type: isChartCard ? param.chartType : "line", // Default to "line" if not specified
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
    series: param.series || [], // Default to empty array if not specified
  };

  const expandedCardStyle = {
    backgroundImage: param.color.backgroundImage
      ? `url(${param.color.backgroundImage})`
      : param.color.backGround,
    boxShadow: param.color.boxShadow,
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={expandedCardStyle}
      layoutId={`expanded-${param.id}`} // Use a unique layoutId
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div
        style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}
        onClick={() => setExpanded(false)}
      >
        <UilTimes />
      </div>
      <span>{param.title}</span>

      {isChartCard ? (
        <div className="chartContainer">
          <Chart options={data.options} series={data.series} type={param.chartType} />
        </div>
      ) : (
        <div className="content_pp">
          {/* Render content only for non-chart cards */}
          <div className="detail">
            <param.png />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Card;
