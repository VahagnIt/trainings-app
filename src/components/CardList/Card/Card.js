import React from "react";
import "./Card.css";

function convertDateFormat(date) {
  let myDate = new Date(date);
  let day = myDate.getDate();
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][myDate.getMonth()];
  day < 10 && (day = "0" + day);
  return month + " " + day + "-" + myDate.getFullYear();
}

const Card = ({ card, getIcon }) => {
  return (
    <div className="Card">
      <div className="header">
        {card.image && <img src={card.image} />}
        <i className={getIcon(card.metric)}></i>
        <div>
          <span>
            <i className="fas fa-crosshairs"></i>
            {card.type.toUpperCase()}
          </span>
          <i className={getIcon(card.metric)}></i>
        </div>
      </div>
      <div className="body">
        <p className="title">{card.title}</p>
        <p className="date">
          <i className="fas fa-calendar-alt"></i>
          {convertDateFormat(card.date.start) + " "}-
          {" " + convertDateFormat(card.date.end)}
        </p>
      </div>
      <div className="footer">
        <button>
          <i className="fas fa-plus"></i>JOIN CONTEST
        </button>
      </div>
    </div>
  );
};
export default Card;
