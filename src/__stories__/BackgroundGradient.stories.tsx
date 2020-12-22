import * as React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  BackgroundGradient,
  IBackgroundGradientProps,
} from "../BackgroundGradient";

export default {
  title: "BackgroundGradient",
  component: BackgroundGradient,
} as Meta;

const Template: Story<IBackgroundGradientProps> = (args) => (
  <div style={{ width: "400px", height: "400px" }}>
    <BackgroundGradient {...args} />
  </div>
);

export const NoProps = Template.bind({});
NoProps.args = {
  src:
    "https://cdn.faire.com/fastly/a474b258e81adfe0e3cfeb0a70b6524e143c1119276df5f24b8e54706884b535.jpeg",
};
