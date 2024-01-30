import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SVGExtProps } from './SVGExt';

export type IconProp = React.ComponentType<any>;

export interface IconProps extends SVGExtProps {
  icon?: IconProp;
  style?: StyleProp<ViewStyle>;
}

const GetIcon = (props: IconProps) => {
  if (props.icon) {
    const Vector = props.icon;
    return <Vector {...props} />;
  } else {
    return null;
  }
};

function Icon(props: IconProps) {
  return <GetIcon {...props} />;
}

export default React.memo(Icon);
