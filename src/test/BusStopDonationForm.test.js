import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import BusStopDonationForm from "../components/BusStopDonationForm";
import { setMockApiSuccessRate, getBusStopById } from "../api/BusStopService";

beforeEach(() => {
  setMockApiSuccessRate(100);
});

it("should render bus stop name for specific busStopId", () => {
  let busStopObject = getBusStopById(5);

  const component = mount(
    <Router>
      <BusStopDonationForm busStopId={busStopObject.stopId} />
    </Router>
  );

  const output = <u>Bus Stop: {busStopObject.name}</u>;

  expect(component.contains(output)).toEqual(true);
});
