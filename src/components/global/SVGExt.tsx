import React from 'react';
import Svg, { Rect, Circle, G, Path } from 'react-native-svg';
import { Animated, StyleProp, ViewStyle } from 'react-native';

export interface SVGExtProps {
  width?: number;
  height?: number;
  viewBox?: string;
  scale?: number;
  secondaryColor?: string;
  accentColor?: string;
  color?: string;
  activated?: boolean;
  secondary?: boolean;
  boldness?: number;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
  fill?: string;
  stroke?: string;
}

class SVGExt extends React.PureComponent<React.PropsWithChildren<SVGExtProps>> {
  render() {
    const { scale = 1, children, width, height, ...rest } = this.props;

    return (
      <Svg
        {...rest}
        width={width ? width * scale : undefined}
        height={height ? height * scale : undefined}
      >
        {children}
      </Svg>
    );
  }
}

export const AnimatedSVG = Animated.createAnimatedComponent(SVGExt);
export default SVGExt;
