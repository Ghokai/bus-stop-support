import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import DonationStatus from "../components/DonationStatus";
import {
  setMockApiSuccessRate,
  getBusStopById,
  getAllStops
} from "../api/BusStopService";

beforeEach(() => {
  setMockApiSuccessRate(100);
});

it("should render bus stop list ", () => {
  const busStops = getAllStops();
  const component = mount(
    <Router>
      <DonationStatus busStopId={0} />
    </Router>
  );

  expect(component.find("tr.busStopRow").length).toEqual(busStops.length);
});

it("should render with specific busStopId for donation details", () => {
  const busStop = getBusStopById(7);
  const component = mount(
    <Router>
      <DonationStatus busStopId={busStop.stopId} />
    </Router>
  );

  expect(component.find("div.selectedBusStopName").text()).toEqual(
    `Donations History for ${busStop.name}`
  );
});
