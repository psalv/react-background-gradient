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

const VERTICAL_BW_URL =
  "https://cdn.faire.com/fastly/c8bf7d1c53d1dfc16849f830814259ef4222fdfb1980b4de2c7f82dd98b936a7.png";
const HORIZONTAL_BW_URL =
  "https://cdn.faire.com/fastly/3fec922da555fc209116c0475009363826a73c7fa584d658a955cadfa1baac3f.png";

const Template: Story<IBackgroundGradientProps> = (args) => (
  <div style={{ width: "400px", height: "400px", border: "1px dashed red" }}>
    <BackgroundGradient {...args} />
  </div>
);

export const VerticalBlackAndWhite = Template.bind({});
VerticalBlackAndWhite.args = {
  src: VERTICAL_BW_URL,
};

export const HorizontalBlackAndWhite = Template.bind({});
HorizontalBlackAndWhite.args = {
  src: HORIZONTAL_BW_URL,
};

export const ForceVerticalFromHorizontalBlackAndWhite = Template.bind({});
ForceVerticalFromHorizontalBlackAndWhite.args = {
  src: HORIZONTAL_BW_URL,
  options: {
    fit: "vertical",
  },
};

export const ForceHorizontalFromVerticalBlackAndWhite = Template.bind({});
ForceHorizontalFromVerticalBlackAndWhite.args = {
  src: VERTICAL_BW_URL,
  options: {
    fit: "horizontal",
  },
};
