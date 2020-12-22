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

const VERTICAL_BW_URL = "https://i.imgur.com/STcNvKY.png";
const HORIZONTAL_BW_URL = "https://i.imgur.com/2SPcs91.png";

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

export const HorizontalPhoto = Template.bind({});
HorizontalPhoto.args = {
  src: "https://i.imgur.com/qOhjIZ4.jpg",
};

export const VerticalPhoto = Template.bind({});
VerticalPhoto.args = {
  src: "https://i.imgur.com/PXQ82xe.jpg",
};

export const ForceVerticalHorizontalPhoto = Template.bind({});
ForceVerticalHorizontalPhoto.args = {
  src: "https://i.imgur.com/qOhjIZ4.jpg",
  options: {
    fit: "vertical",
  },
};

export const ForceHorizontalVerticalPhoto = Template.bind({});
ForceHorizontalVerticalPhoto.args = {
  src: "https://i.imgur.com/PXQ82xe.jpg",
  options: {
    fit: "horizontal",
  },
};

export const TallHorizontalPhoto = Template.bind({});
TallHorizontalPhoto.args = {
  src: "https://i.imgur.com/qOhjIZ4.jpg",
  options: {
    dimensions: {
      width: "300px",
      height: "400px;",
    },
  },
};

export const WideHorizontalPhoto = Template.bind({});
WideHorizontalPhoto.args = {
  src: "https://i.imgur.com/qOhjIZ4.jpg",
  options: {
    dimensions: {
      width: "400px",
      height: "300px;",
    },
  },
};

export const TallVerticalPhoto = Template.bind({});
TallVerticalPhoto.args = {
  src: "https://i.imgur.com/PXQ82xe.jpg",
  options: {
    dimensions: {
      width: "300px",
      height: "400px;",
    },
  },
};

export const WideVerticalPhoto = Template.bind({});
WideVerticalPhoto.args = {
  src: "https://i.imgur.com/PXQ82xe.jpg",
  options: {
    dimensions: {
      width: "400px",
      height: "300px;",
    },
  },
};
