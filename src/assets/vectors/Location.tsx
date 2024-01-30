import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={18}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      d="M9 .5A8.744 8.744 0 0 0 .25 9.25c0 2.175.625 4.213 1.763 6.05 1.187 1.925 2.75 3.575 3.95 5.5.587.938 1.012 1.813 1.462 2.825.325.688.587 1.875 1.575 1.875s1.25-1.188 1.563-1.875c.462-1.012.874-1.887 1.462-2.825 1.2-1.913 2.762-3.563 3.95-5.5 1.15-1.838 1.775-3.875 1.775-6.05A8.744 8.744 0 0 0 9 .5Zm0 12.188a3.126 3.126 0 0 1 0-6.25 3.126 3.126 0 0 1 0 6.25Z"
      fill="#00C5CD"
    />
  </SVGExt>
)

export default SvgComponent
