import * as React from "react"
import { Path, SvgAst ,Circle} from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
  width={18}
  height={18}
  fill="none"
  {...props}
>
  <Circle
    cx={9}
    cy={9}
    r={8.75}
    fill="#fff"
    stroke="#1644B6"
    strokeWidth={0.5}
  />
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M9 3a6 6 0 1 1-.002 12.002A6 6 0 0 1 9 3Zm3.62 3.618L6.618 12.62a4.334 4.334 0 0 0 6.001-6.001Zm-7.24 4.764 6.002-6.002a4.334 4.334 0 0 0-6.001 6.001Z"
    fill="#1644B6"
  />
</SVGExt>
)

export default SvgComponent