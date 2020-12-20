import * as React from "react";
import { BackgroundGradient } from "../index";
import { create } from "react-test-renderer";

describe("BackgroundGradient", () => {
  test("Component should show 'red' text 'Hello World'", () => {
    const component = create(<BackgroundGradient src={""} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
