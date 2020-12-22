/**
 * @class BackgroundGradient
 * Attempts to fill an area with an image without cutting any of the image off.
 * Any whitespace is replaced by a gradient taken from the the top halves of the image.
 */

import * as React from "react";
import styled, { css } from "styled-components";
const ColorThief = require("./colorthief");

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
    // How accurate colorthief is at creating the gradients. 1 - 10 (1 being highest quality)
    quality?: number;
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

// Controls how accurate colorthief is
const QUALITY = 10;

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
    const { image } = this.state;
    if (!image) {
      return;
    }

    const { height, width } = image;

    const isVertical = height > width;

    const colorThief = new ColorThief();
    const from = `rgb(${colorThief
      .getColor(
        image,
        this.props.options?.quality ?? QUALITY,
        isVertical
          ? {
              top: 0,
              bottom: height,
              left: 0,
              right: width * 0.5,
              width,
              height,
            } // Left
          : {
              top: 0,
              bottom: height * 0.5,
              left: 0,
              right: width,
              width,
              height,
            } // Top
      )
      .join(",")})`;
    const to = `rgb(${colorThief
      .getColor(
        image,
        this.props.options?.quality ?? QUALITY,
        isVertical
          ? {
              top: 0,
              bottom: height,
              left: width * 0.5,
              right: width,
              width,
              height,
            } // Right
          : {
              top: height * 0.5,
              bottom: height,
              left: 0,
              right: width,
              width,
              height,
            } // Bottom
      )
      .join(",")})`;

    this.setState({
      imageDimensions: {
        width,
        height,
      },
      gradient: {
        from,
        to,
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
  gradient?: IColorGradient;
  isVertical: boolean;
}>`
  background-image: linear-gradient(
    ${(props) => (props.isVertical ? "to right," : "")}
      ${(props) =>
        props.gradient
          ? `${props.gradient.from},${props.gradient.to}`
          : "white"}
  );
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
