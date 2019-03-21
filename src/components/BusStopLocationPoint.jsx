import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const K_WIDTH = 45;
const K_HEIGHT = 45;

const busStopSyle = {
  position: "absolute",
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: "2px solid #f44336",
  borderRadius: K_HEIGHT,
  backgroundColor: "yellow",
  textAlign: "center",
  color: "black",
  fontSize: 9,
  fontWeight: "bold",
  padding: 3
};

class BusStopLocationPoint extends Component {
  render() {
    const { name, stopId, history } = this.props;
    return (
      <div
        style={{ ...busStopSyle }}
        onClick={() => {
          history.push(`/donate/${stopId}`);
        }}
      >
        {name}
      </div>
    );
  }
}

export default withRouter(BusStopLocationPoint);
