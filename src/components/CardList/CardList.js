import React from "react";
import Card from "./Card/Card";
import classes from "./CardList.module.css";

const CardList = ({ cards, getIcon, loadMore, page }) => {
  return (
    <div className={classes.wrapper}>
      {cards.map((card) => {
        return <Card key={card.id} card={card} getIcon={getIcon} />;
      })}
      <button
        className={classes.button}
        onClick={() => loadMore(-1)}
        disabled={!(page - 1)}
      >
        <i className="fas fa-backward"></i>
      </button>
      <span className={classes.page_num}>{page}</span>
      <button className={classes.button} onClick={() => loadMore(1)}>
        <i className="fas fa-forward"></i>
      </button>
    </div>
  );
};

export default CardList;
