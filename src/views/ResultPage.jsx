import React from "react";
import DonationStatus from "../components/DonationStatus";

export default function ResultPage(props) {
  let id = props.match.params.id;

  return <DonationStatus busStopId={id} />;
}
