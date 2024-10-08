import React from "react";
import "./Cards.css";  // Make sure the CSS file path is correct
import { cardsData } from "../../Data/Data";  // Ensure this path is correct
import Card from "../Card/Card";  // Ensure this path is correct

const Cards = () => {
  return (
    <div className="Cards">
      {cardsData.map((card, id) => (
        <div className="parentContainer" key={id}>

          
          <Card
            title={card.title}
            color={card.color}
            png={card.png}
            series={card.series}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
