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
    "https://cdn.faire.com/fastly/cd31190d06f93bfd03f2909758199b0f91caf4a6f88b153f5d007c69c2ac3887.jpeg",
};
