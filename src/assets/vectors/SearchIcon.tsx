import * as React from "react"
import { Path, Rect } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Rect width={30} height={30} rx={15} fill="#00C5CD" />
    <Path
      d="M14.423 19.433a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667ZM21.09 20.766l-2.9-2.9"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent
