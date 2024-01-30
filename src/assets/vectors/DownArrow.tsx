import * as React from "react";
import { Path } from "react-native-svg";
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt";

const SvgComponent = (props: SVGExtProps) => (
  <SVGExt width={16} height={10} fill="none" {...props}>
    <Path
      d="M0 .56.413 0h11.194L12 .54 6.373 6h-.827L0 .56Z"
      fill={props.fill ? props.fill : "#1644B6"}
    />
  </SVGExt>
);

export default SvgComponent;
