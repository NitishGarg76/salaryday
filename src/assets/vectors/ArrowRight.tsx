import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
    <SVGExt
    width={9}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      d="M.878 2.218a1.348 1.348 0 0 1-.34-.923C.542.954.675.628.907.386c.233-.241.546-.38.875-.386.329-.006.647.121.887.354l5.496 5.714c.238.247.371.583.371.932 0 .35-.133.685-.37.932L2.67 13.646c-.24.233-.558.36-.887.354a1.245 1.245 0 0 1-.874-.386 1.345 1.345 0 0 1-.372-.91 1.348 1.348 0 0 1 .34-.922L5.478 7l-4.6-4.782Z"
      fill="#1644B6"
    />
  </SVGExt>
)

export default SvgComponent
