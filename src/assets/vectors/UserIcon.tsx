import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={24}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      d="M11.99 0a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5ZM0 25.395A7.494 7.494 0 0 1 7.49 18h9a7.494 7.494 0 0 1 7.489 7.395 17.91 17.91 0 0 1-23.979 0Z"
      fill="#00C5CD"
    />
  </SVGExt>
)

export default SvgComponent
