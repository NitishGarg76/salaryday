import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={26}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      d="M21.75 20.75V3.417c0-.575-.263-1.126-.732-1.532a2.708 2.708 0 0 0-1.768-.635H6.75c-.663 0-1.299.228-1.768.635-.469.406-.732.957-.732 1.532V20.75m17.5 0H4.25m17.5 0h2.5m-2.5 0H15.5m-11.25 0h-2.5m2.5 0h6.25m5 0v-5.417c0-.287-.132-.563-.366-.766a1.354 1.354 0 0 0-.884-.317h-2.5c-.332 0-.65.114-.884.317a1.016 1.016 0 0 0-.366.766v5.417m5 0h-5m0 0 4-1.517H11l4-1.3-4-.433 4-.867M9.25 5.583h1.25M9.25 9.917h1.25m5-4.334h1.25M15.5 9.917h1.25M15 16.633l-4-.433.75-1.3H15v1.733Z"
      stroke="#00C5CD"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent
