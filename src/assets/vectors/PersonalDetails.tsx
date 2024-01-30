import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={26}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      d="M8 9.065c2.494 0 4.375-1.881 4.375-4.375C12.375 2.196 10.494.315 8 .315c-2.494 0-4.375 1.881-4.375 4.375 0 2.494 1.881 4.375 4.375 4.375Zm1.25 1.185h-2.5A6.257 6.257 0 0 0 .5 16.5v1.25h15V16.5a6.257 6.257 0 0 0-6.25-6.25Zm14.117-5.885L17.992 9.73l-1.614-1.615-1.768 1.767 3.383 3.38 7.14-7.127-1.765-1.77Z"
      fill="#00C5CD"
    />
  </SVGExt>
)

export default SvgComponent
