import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import BusStopLocationPoint from "./BusStopLocationPoint";
import { googleMapApiKey } from "../api/googleMapApi";
import { getAllStops } from "../api/BusStopService";
import ErrorMessageWithLayout from "./ErrorMessageWithLayout";

export default class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = { busStops: [], errorMsg: "", center: null, zoom: 16 };
  }

  componentDidMount() {
    this.loadStops();
  }

  loadStops = () => {
    try {
      const busStops = getAllStops();

      let center = null;
      if (busStops.length > 0) {
        center = {
          lat: busStops[0].lat,
          lng: busStops[0].lng
        };
      }

      this.setState({
        busStops,
        errorMsg: "",
        center
      });
    } catch (e) {
      console.log(e.message);
      this.setState({
        busStops: [],
        errorMsg: e.message,
        center: null
      });
    }
  };

  render() {
    const { busStops, errorMsg, center, zoom } = this.state;
    if (errorMsg.length > 0) {
      return (
        <ErrorMessageWithLayout
          errorMsg={errorMsg}
          tryAgain={() => this.loadStops()}
        />
      );
    }

    const busStopPoints = busStops.map(bs => (
      <BusStopLocationPoint key={bs.stopId} {...bs} />
    ));

    return (
      <div style={{ height: "93vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapApiKey }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {busStopPoints}
        </GoogleMapReact>
      </div>
    );
  }
}
