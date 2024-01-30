import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={31}
    height={31}
    fill="none"
    {...props}
  >
    <Path
      d="M15.507 30.5a14.986 14.986 0 0 1-15-15v-.3a15.008 15.008 0 0 1 29.72-2.629A15 15 0 0 1 15.507 30.5Zm0-12.885 3.885 3.885 2.115-2.115-3.885-3.885 3.885-3.885L19.392 9.5l-3.885 3.885L11.622 9.5l-2.115 2.115 3.885 3.885-3.885 3.885 2.115 2.115 3.885-3.884v-.001Z"
      fill="#28C9C9"
    />
  </SVGExt>
)

export default SvgComponent
