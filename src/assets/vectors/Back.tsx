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
    <Rect width={35} height={22} rx={10} fill="#00C5CD" />
    <Path
      d="m15 14-5-4 5-4"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 10h10.5c.928 0 1.819.376 2.475 1.045A3.604 3.604 0 0 1 24 13.57V16"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent
