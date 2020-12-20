/**
 * @class BackgroundGradient
 * Attempts to fill an area with an image without cutting any of the image off.
 * Any whitespace is replaced by a gradient taken from the the top halves of the image.
 */

import * as React from "react";

interface IProps {
  src: string;
  options?: {
    height?: number;
    width?: number;
    // Defaults to fitting the image in whichever direction will fit within the bounding box without being cut off,
    // if no bounding box is specified, it will fit to the longer side of the image.
    // If a fit is selected, will fit the image and add gradients in the opposite direction if applicable.
    fit?: "vertical" | "horizontal";
  };
}

export class BackgroundGradient extends React.Component<IProps> {
  render() {
    return <div style={{ color: "red" }}>Hello</div>;
  }
}
