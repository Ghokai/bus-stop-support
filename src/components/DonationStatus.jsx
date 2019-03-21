import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LayoutHOC from "./LayoutHOC";
import { getAllStops, getDonationHistory } from "../api/BusStopService";
import ErrorMessage from "./ErrorMessage";
import DonationsHistory from "./DonationsHistory";
import BusStopList from "./BusStopList";

class DonationStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busStopId: 0,
      busStops: [],
      selectedBusStopDonationHistory: [],
      errMsg: ""
    };
  }

  componentDidMount() {
    let { busStopId } = this.props;

    this.loadData(busStopId);
  }

  loadData = busStopId => {
    this.setState({ errMsg: "" });
    this.loadBusStops();
    this.setSelectedBusStopId(busStopId);
  };

  loadBusStops = () => {
    try {
      let busStops = getAllStops();

      this.setState({ busStops });
    } catch (e) {
      this.setState({
        errMsg: e.message
      });
    }
  };

  setSelectedBusStopId = busStopId => {
    this.setState({ busStopId });
    this.loadDonations(busStopId);
  };

  loadDonations = stopId => {
    try {
      if (stopId <= 0) {
        return;
      }

      let donations = getDonationHistory(stopId);

      this.setState({ selectedBusStopDonationHistory: donations });
    } catch (e) {
      this.setState({
        errMsg: e.message
      });
    }
  };

  render() {
    let {
      errMsg,
      busStopId,
      busStops,
      selectedBusStopDonationHistory
    } = this.state;

    let selectedBusStop = busStops.find(b => b.stopId === parseInt(busStopId));

    if (errMsg.length > 0) {
      return (
        <ErrorMessage
          errorMsg={errMsg}
          tryAgain={() => this.loadData(busStopId)}
        />
      );
    }

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} md={12}>
            <BusStopList
              busStops={busStops}
              setSelectedBusStopId={this.setSelectedBusStopId}
            />
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12} md={12}>
            <DonationsHistory
              busStop={selectedBusStop}
              donationHistory={selectedBusStopDonationHistory}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(LayoutHOC(DonationStatus));
