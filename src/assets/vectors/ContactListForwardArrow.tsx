import * as React from "react"
import { Path, Rect } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Rect width={48} height={48} rx={24} fill="#1644B6" />
    <Path
      d="M32 24H16m16 0-5.333 5M32 24l-5.333-5"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent
