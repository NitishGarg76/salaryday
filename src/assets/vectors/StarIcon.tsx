import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={24}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      d="M11.075 1.633c.32-.844 1.53-.844 1.852 0l2.07 5.734a.99.99 0 0 0 .926.633h5.087c.94 0 1.35 1.17.61 1.743L18 13a.968.968 0 0 0-.321 1.092L19 19.695c.322.9-.72 1.673-1.508 1.119l-4.917-3.12a1 1 0 0 0-1.15 0l-4.917 3.12c-.787.554-1.83-.22-1.508-1.119l1.322-5.603A.968.968 0 0 0 6 13L2.38 9.743C1.64 9.17 2.053 8 2.99 8h5.087a.989.989 0 0 0 .926-.633l2.07-5.734h0Z"
      stroke="#0EBEC5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent
