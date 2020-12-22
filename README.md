# react-background-gradient

## Create Instagram Stories-like background gradients for images

![Vertical image](https://i.imgur.com/uULYLO9.png)

## API

```tsx
export interface IDimensions {
  height: string;
  width: string;
}

export interface IBackgroundGradientProps {
  src: string;
  options?: {
    // If no dimensions are set, the image will take up it's parent container 
    dimensions?: IDimensions;
    // Defaults to fitting the image in whichever direction will fit within the bounding box without being cut off,
    // if no bounding box is specified, it will fit to the longer side of the image.
    // If a fit is selected, will fit the image and add gradients in the opposite direction if applicable.
    fit?: "vertical" | "horizontal";
    // Alt text for the image
    alt?: string;
    // How accurate colorthief is at creating the gradients. 1 - 10 (1 being highest quality)
    quality?: number;
  };
}
```

## Examples

### Vertical Image

![Vertical image](https://i.imgur.com/uULYLO9.png)

```tsx
<BackgroundImage src="https://i.imgur.com/uULYLO9.png" />
```

### Horizontal Image

![Horizontal image](https://i.imgur.com/5c8g5dP.png)

```tsx
<BackgroundImage src="https://i.imgur.com/5c8g5dP.png" />
```

### Wide Dimensions

![Wide image](https://i.imgur.com/Co686D3.png)

```tsx
<BackgroundImage
  src="https://i.imgur.com/5c8g5dP.png"
  options={{ dimensions: { width: "400px", height: "300px" } }}
/>
```

### Tall Dimensions

![Tall image](https://i.imgur.com/sTxadMO.png)

```tsx
<BackgroundImage
  src="https://i.imgur.com/5c8g5dP.png"
  options={{ dimensions: { width: "300px", height: "400px" } }}
/>
```

### Force Horizontal Fit (of vertical image)

![Force horizontal image](https://i.imgur.com/NHFiESK.png)


```tsx
<BackgroundImage
  src="https://i.imgur.com/5c8g5dP.png"
  options={{ fit: "horizontal" }}
/>
```
