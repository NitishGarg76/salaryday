import * as React from "react";
import { Path, Circle } from "react-native-svg";
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt";
const SvgComponent = (props: SVGExtProps) => (
  <SVGExt width={36} height={36} fill="none" {...props}>
    <Path
      d="M18 33A14.987 14.987 0 0 1 3 18v-.3a15.008 15.008 0 0 1 29.72-2.629A15 15 0 0 1 18 33Zm0-12.885L21.885 24 24 21.885 20.115 18 24 14.115 21.885 12 18 15.885 14.115 12 12 14.115 15.885 18 12 21.885 14.115 24 18 20.116v-.001Z"
      fill={props.fill ? props.fill : "#fff"}
    />
  </SVGExt>
);
export default SvgComponent;