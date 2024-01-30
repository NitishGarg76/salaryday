import * as React from "react"
import { Circle, Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Circle cx={12} cy={12} r={12} fill={ props.fill? props.fill : "#1644B6"} />
    <Path
      d="m10 17 5-5-5-5"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent
