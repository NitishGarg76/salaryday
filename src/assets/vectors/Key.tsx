import * as React from "react";
import { Path } from "react-native-svg";
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt";

const SvgComponent = (props: SVGExtProps) => (
  <SVGExt
    width={43}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      d="M20.02 10.846c-3.832-3.118-9.362-3.648-13.814-.922C.56 13.38-1.22 20.778 2.238 26.424c3.456 5.646 10.854 7.425 16.5 3.968 4.452-2.726 6.494-7.892 5.46-12.723l7.42-4.543 4.177 6.823 6.822-4.177-4.177-6.823 3.412-2.089L37.674.038 20.02 10.846ZM14.56 23.57a4.012 4.012 0 0 1-5.5-1.322 4.012 4.012 0 0 1 1.323-5.5 4.012 4.012 0 0 1 5.5 1.322 4.012 4.012 0 0 1-1.323 5.5Z"
      fill="#1644B6"
    />
  </SVGExt>
);

export default SvgComponent;
