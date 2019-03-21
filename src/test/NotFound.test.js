import React from "react";
import NotFound from "../views/NotFound";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";

it("should render notfound ", () => {
  const component = mount(
    <Router>
      <NotFound />
    </Router>
  );

  const output = (
    <span>{"The path which you are requesting is not found!"}</span>
  );

  expect(component.contains(output)).toEqual(true);
});
