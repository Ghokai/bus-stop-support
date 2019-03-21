import React from "react";
import ErrorMessage from "../components/ErrorMessage";
import { shallow, mount } from "enzyme";

it("should render with error tesxt", () => {
  const ErrorText = "test error message";

  const component = mount(
    <ErrorMessage errorMsg={ErrorText} tryAgain={() => null} />
  );

  const output = <span>{ErrorText}</span>;

  expect(component.contains(output)).toEqual(true);
});

function mockHandler() {
  this.calls = 0;
}
mockHandler.prototype.fn = function() {
  return () => this.calls++;
};

it("should call function which passed as prop", () => {
  const ErrorText = "test error message";
  const mySpy = new mockHandler();
  const mockCallBack = mySpy.fn();

  const component = mount(
    <ErrorMessage errorMsg={ErrorText} tryAgain={() => mockCallBack()} />
  );

  component.find("button").simulate("click");
  expect(mySpy.calls).toEqual(1);
});

it("should render with button text ", () => {
  const ErrorText = "test error message";
  const buttonText = "new text for button";

  const component = mount(
    <ErrorMessage
      errorMsg={ErrorText}
      tryAgain={() => ({})}
      buttonText={buttonText}
    />
  );

  expect(component.find("button").text()).toEqual(buttonText);
});
