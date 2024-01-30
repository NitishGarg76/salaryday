import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-5.16V12a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.5-1.5 1 1 0 1 1-2 0 3.5 3.5 0 1 1 4.5 3.34Z"
      fill="#0EBEC5"
    />
  </SVGExt>
)

export default SvgComponent
