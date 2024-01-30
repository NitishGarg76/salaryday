import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={16}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M13.833.333H2.167A1.667 1.667 0 0 0 .5 2v20a1.667 1.667 0 0 0 1.667 1.667h11.666A1.666 1.666 0 0 0 15.5 22V2A1.667 1.667 0 0 0 13.833.333ZM8.833 22H7.167v-1.667h1.666V22Zm-6.666-3.333V2h11.666v16.667H2.167Z"
      fill="#00C5CD"
    />
  </SVGExt>
)

export default SvgComponent
