import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import ResultPage from "../views/ResultPage";
import { mount } from "enzyme";
import { setMockApiSuccessRate, getBusStopById } from "../api/BusStopService";

beforeEach(() => {
  setMockApiSuccessRate(100);
});

it("should render notfound ", () => {
  let busStopObject = getBusStopById(5);

  const component = mount(
    <MemoryRouter initialEntries={[`/donationsummary/${busStopObject.stopId}`]}>
      <Route
        component={props => <ResultPage {...props} />}
        path="/donationsummary/:id"
      />
    </MemoryRouter>
  );

  expect(component.find("div.selectedBusStopName").text()).toEqual(
    `Donations History for ${busStopObject.name}`
  );
});
