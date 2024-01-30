import * as React from "react";
import { Path, Defs, G, ClipPath } from "react-native-svg";
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt";

const SvgComponent = (props: SVGExtProps) => (
  <SVGExt width={19} height={19} fill="none" {...props}>
    <G
      clipPath="url(#a)"
      stroke="#1644B6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.233 17.269a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM9.233 6.769v6M6.233 9.769h6" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(.233 .769)" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </SVGExt>
);

export default SvgComponent;
