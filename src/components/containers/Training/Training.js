import React from "react";

import "./Training.css";

import Filter from "../../Filter/Filter";
import CardList from "../../CardList/CardList";
import Loader from "../../Loader/Loader";

import { getCards } from "../../../services/api";
import {
  toObjectFromURL,
  generateSearchURL,
} from "../../../services/UrlService";

class Training extends React.Component {
  state = {
    states: [
      { name: "Ongoing", checked: false, state: "inprocess" },
      { name: "Upcoming", checked: false, state: "upcoming" },
      { name: "Ended", checked: false, state: "past" },
    ],
    metrices: [
      { id: 1, name: "steps", checked: false, icon: "fas fa-shoe-prints" },
      { id: 2, name: "calories", checked: false, icon: "fas fa-walking" },
      { id: 3, name: "sleep", checked: false, icon: "fas fa-globe-europe" },
      { id: 5, name: "activity", checked: false, icon: "fas fa-fire-alt" },
      { id: 9, name: "distance", checked: false, icon: "fas fa-cloud-moon" },
      { id: 16, name: "water", checked: false, icon: "fas fa-tint" },
    ],
    loaded: true,
    cards: [],
    page: "1",
    pagesize: "6",
    state: "",
    metrics: "",
  };
  componentDidMount() {
    let search = this.props.location.search;
    if (search) {
      this.setState({ loaded: false });
      let obj = toObjectFromURL(search);
      let states = this.state.states.slice();
      if (obj.state) {
        states = states.map((el) => {
          if (el.state === obj.state) {
            el.checked = true;
          }
          return el;
        });
      }
      let metrices = this.state.metrices.slice();
      if (obj.metrics) {
        let ids = obj.metrics.split(",").map((el) => +el);
        metrices = metrices.map((el) => {
          if (ids.includes(el.id)) {
            el.checked = true;
          }
          return el;
        });
      }
      getCards(search)
        .then((cards) =>
          this.setState({ ...obj, states, metrices, cards, loaded: true })
        )
        .catch((err) => console.log(err));
    }
  }
  loadMore = (dir) => {
    this.setState((prevState) => {
      return {
        page: +prevState.page + dir,
      };
    }, this.stateChanged);
  };
  onChangeStatus = (index) => {
    let states = this.state.states.slice();
    states.forEach((el, i) => {
      el.checked = i !== index ? false : true;
    });
    let state = states.filter((el) => el.checked)[0];
    state = state ? state.state.toLowerCase() : "";
    this.setState({ states, state, page: "1" }, this.stateChanged);
  };
  onClickMetrice = (id) => {
    let metrices = this.state.metrices.map((el) => {
      if (el.id === id) {
        el.checked = !el.checked;
      }
      return el;
    });
    const metrics = metrices
      .filter((el) => el.checked)
      .map((el) => el.id)
      .toString();
    this.setState({ metrices, metrics, page: "1" }, this.stateChanged);
  };
  stateChanged = () => {
    let { page, pagesize, state, metrics } = this.state;
    let path = generateSearchURL({ page, pagesize, state, metrics });
    if (this.props.location.search !== path) {
      this.setState({ loaded: false });
      this.changeURL(path);
      getCards(path)
        .then((cards) => {
          this.setState({ cards, loaded: true });
        })
        .catch((err) => console.log(err));
    }
  };
  changeURL = (path) => {
    this.props.history.push({
      pathname: "",
      search: `${path}`,
    });
  };
  getIcon = (id) => {
    return this.state.metrices.filter((el) => el.id === id)[0].icon;
  };
  render() {
    let cardList = null;
    if (this.state.loaded && this.state.cards.length) {
      cardList = (
        <CardList
          cards={this.state.cards}
          getIcon={this.getIcon}
          loadMore={this.loadMore}
          page={+this.state.page}
        />
      );
    } else if (!this.state.loaded) {
      cardList = <Loader />;
    }
    return (
      <div className="Training">
        <Filter
          states={this.state.states}
          metrices={this.state.metrices}
          onClickMetrice={this.onClickMetrice}
          onChangeStatus={this.onChangeStatus}
        />
        {cardList}
      </div>
    );
  }
}

export default Training;
