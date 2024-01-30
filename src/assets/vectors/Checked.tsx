import * as React from 'react';
import { Path } from 'react-native-svg';
import SVGExt, { SVGExtProps } from '../../components/global/SVGExt';

export default ({
  boldness,
  ...props
}: SVGExtProps) => {
  return (
    <SVGExt
    width={11}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      d="M10 1 4 7 1 4"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
  );
};