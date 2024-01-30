import * as React from "react"
import { Path, Rect } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={35}
    height={26}
    fill="none"
    {...props}
  >
    <Rect width={35} height={22} rx={10} fill="#fff" />
    <Path
      d="M10.125 14.375h9.75m-9.75-6h15.75"
      stroke="#1644B6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent
