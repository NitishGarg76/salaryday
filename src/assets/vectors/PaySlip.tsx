import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      d="M30 8H12v32h24V14h-6V8ZM12 4h20l8 8v28a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm4 18h16v4H16v-4Zm0 8h16v4H16v-4Z"
      fill="#0EBEC5"
    />
  </SVGExt>
)

export default SvgComponent
