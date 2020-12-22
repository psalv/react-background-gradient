/**
 * @class BackgroundGradient
 * Attempts to fill an area with an image without cutting any of the image off.
 * Any whitespace is replaced by a gradient taken from the the top halves of the image.
 */

import * as React from "react";
import styled, { css } from "styled-components";
import ColorThief from "colorthief";

export interface IBackgroundGradientProps {
  src: string;
  options?: {
    height?: number;
    width?: number;
    // Defaults to fitting the image in whichever direction will fit within the bounding box without being cut off,
    // if no bounding box is specified, it will fit to the longer side of the image.
    // If a fit is selected, will fit the image and add gradients in the opposite direction if applicable.
    fit?: "vertical" | "horizontal";
    alt?: string;
  };
}

interface IState {
  imageDimensions?: {
    width: number;
    height: number;
  };
  gradient?: IColorGradient;
  image?: HTMLImageElement;
}

interface IColorGradient {
  from: string;
  to: string;
}

export class BackgroundGradient extends React.Component<
  IBackgroundGradientProps,
  IState
> {
  state: IState = { imageDimensions: undefined, image: undefined };

  componentDidMount() {
    this.setState({ image: new Image() }, () => {
      if (!this.state.image) {
        console.info(`Could not load ${this.props.src}`);
        return;
      }
      this.state.image.onload = this.handleImageLoaded;
      this.state.image.crossOrigin = "Anonymous";
      this.state.image.src = this.props.src;
    });
  }

  handleImageLoaded = () => {
    if (!this.state.image) {
      return;
    }

    const colorThief = new ColorThief();
    const color = `rgb(${colorThief.getColor(this.state.image).join(",")})`;

    this.setState({
      imageDimensions: {
        width: this.state.image.width,
        height: this.state.image.height,
      },
      gradient: {
        from: color,
        to: color,
      },
    });
  };

  get isVertical() {
    if (!this.state.imageDimensions) {
      return false;
    }
    return this.state.imageDimensions.height > this.state.imageDimensions.width;
  }

  render() {
    const { src, options } = this.props;

    if (this.state.imageDimensions === undefined) {
      return null;
    }

    console.log(this.state.gradient);

    return (
      <ImageWrapper gradient={this.state.gradient} isVertical={this.isVertical}>
        <ImageElement
          src={src}
          alt={options?.alt}
          isVertical={this.isVertical}
        />
      </ImageWrapper>
    );
  }
}

const ImageElement = styled.img<{ isVertical: boolean }>`
  ${(props) =>
    props.isVertical
      ? css`
          height: 100%;
        `
      : css`
          width: 100%;
        `};
`;

const ImageWrapper = styled.div<{
  gradient: IColorGradient;
  isVertical: boolean;
}>`
  background-color: ${(props) => props.gradient.from};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;