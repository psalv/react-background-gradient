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
  <BackgroundGradient {...args} />
);

export const NoProps = Template.bind({});
NoProps.args = {
  src: "foo",
};
