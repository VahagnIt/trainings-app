import React from "react";
import "./Filter.css";

const generateStatusBar = ({ states, onChangeStatus }) => {
  return states.map((el, index) => {
    return (
      <li
        key={index}
        className={el.checked ? "checked" : ""}
        onClick={() => onChangeStatus(index)}
      >
        {el.name}
      </li>
    );
  });
};
const generateMetriceBar = ({ metrices, onClickMetrice }) => {
  return metrices.map((el) => {
    return (
      <li
        key={el.id}
        className={el.checked ? "checked" : ""}
        onClick={() => onClickMetrice(el.id)}
      >
        <i className={el.icon} />
      </li>
    );
  });
};
const Filter = (props) => {
  return (
    <div className="filter">
      <div className="statuses-wrapper">
        <ul className="statuses">{generateStatusBar(props)}</ul>
      </div>
      <div className="metrices-wrapper">
        <h3 className="title"> Metrice</h3>
        <ul className="metrices">{generateMetriceBar(props)}</ul>
      </div>
    </div>
  );
};

export default Filter;
