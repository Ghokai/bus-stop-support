import React from "react";
import BusStopDonationForm from "../components/BusStopDonationForm";

export default function DonatePage(props) {
  let id = props.match.params.id;

  return <BusStopDonationForm busStopId={id} />;
}
