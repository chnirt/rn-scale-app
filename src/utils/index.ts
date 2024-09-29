import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

// Get the device's width
const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Define the width of your design (from Figma)
const DESIGN_WIDTH = 375; // Example width for iPhone 11 (or whatever your Figma design uses)

// Function to scale sizes based on the design width
const scaleSize = (size: number) => {
  const scaleRatio = SCREEN_WIDTH / DESIGN_WIDTH;
  return PixelRatio.roundToNearestPixel(size * scaleRatio);
};

// Function to scale font sizes
const scaleFont = (size: number) => {
  const scaleRatio = SCREEN_WIDTH / DESIGN_WIDTH;
  return PixelRatio.roundToNearestPixel(size * scaleRatio);
};

// Function to recursively scale object properties
const convertScaleObj = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  o: T | StyleSheet.NamedStyles<T> | any,
): T => {
  Object.keys(o).forEach(k => {
    if (typeof o[k] === 'object') {
      // Recursively scale nested objects
      convertScaleObj(o[k]);
      return;
    }
    if (typeof o[k] === 'number') {
      // Scale based on property type
      if (k === 'fontSize') {
        o[k] = scaleFont(o[k]);
      }
      if (
        ['width', 'height', 'gap', 'borderRadius'].includes(k) ||
        k.startsWith('padding') ||
        k.startsWith('margin')
      ) {
        o[k] = scaleSize(o[k]);
      }
    }
  });
  return o;
};

// Custom stylesheet creator that applies scaling
export const ChnirtStyleSheet = {
  create: <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    _styles: T | StyleSheet.NamedStyles<T>,
  ): T => StyleSheet.create(convertScaleObj(_styles)),
};
