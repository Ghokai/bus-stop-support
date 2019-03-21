import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import BusStopList from "../components/BusStopList";
import { setMockApiSuccessRate, getAllStops } from "../api/BusStopService";

beforeEach(() => {
  setMockApiSuccessRate(100);
});

it("should render table with bus stop list", () => {
  const busStopList = getAllStops();

  const component = mount(
    <Router>
      <BusStopList busStops={busStopList} />
    </Router>
  );

  expect(component.find("tr.busStopRow").length).toEqual(busStopList.length);
});
