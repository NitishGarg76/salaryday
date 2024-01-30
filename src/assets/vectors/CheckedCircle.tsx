import * as React from "react";
import { Path } from "react-native-svg";
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt";

const SvgComponent = (props: SVGExtProps) => (
  <SVGExt width={18} height={18} fill="none" {...props}>
    <Path
      d="M16.812 9.938c-.625 3.125-2.98 6.067-6.287 6.725A7.812 7.812 0 0 1 3.216 3.748C5.484 1.25 9.312.563 12.437 1.813"
      stroke="#1644B6"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m6.188 8.688 3.125 3.124 7.5-8.124"
      stroke="#1644B6"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
);

export default SvgComponent;