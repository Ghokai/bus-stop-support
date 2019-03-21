import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import DonatePage from "../views/DonatePage";
import { mount } from "enzyme";
import { setMockApiSuccessRate, getBusStopById } from "../api/BusStopService";

beforeEach(() => {
  setMockApiSuccessRate(100);
});

it("should render notfound ", () => {
  let busStopObject = getBusStopById(5);

  const component = mount(
    <MemoryRouter initialEntries={[`/donate/${busStopObject.stopId}`]}>
      <Route
        component={props => <DonatePage {...props} />}
        path="/donate/:id"
      />
    </MemoryRouter>
  );

  const output = <u>Bus Stop: {busStopObject.name}</u>;

  expect(component.contains(output)).toEqual(true);
});
