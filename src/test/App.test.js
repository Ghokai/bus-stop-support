import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import {
  setMockApiSuccessRate,
  getMockApiSuccessRate
} from "../api/BusStopService";
//import { shallow, mount } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("check mock api success rate", () => {
  const defaultMockApiSuccessRate = getMockApiSuccessRate();
  expect(defaultMockApiSuccessRate).toEqual(80);

  const newRate = 100;
  setMockApiSuccessRate(newRate);
  const newMockApiSuccessRate = getMockApiSuccessRate();

  expect(newMockApiSuccessRate).toEqual(newRate);
});
