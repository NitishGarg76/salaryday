import * as React from "react"
import { Circle, Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle cx={10} cy={10} r={10} fill="#1644B6" />
    <Path
      d="m15 7.154-6 6.02-3-3.01"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent
