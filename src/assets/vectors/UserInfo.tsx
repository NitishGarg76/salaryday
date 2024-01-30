import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExt) => (
  <SVGExt
    width={27}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      d="M17 3.125h10v2.063H17V3.124Zm0 5.156h10v2.063H17V8.28Zm0 5.156h7V15.5h-7v-2.063ZM8 0C6.892 0 5.81.327 4.889.94a5.584 5.584 0 0 0-2.063 2.504A5.56 5.56 0 0 0 4.04 9.525a5.619 5.619 0 0 0 6.103 1.21 5.595 5.595 0 0 0 2.513-2.055 5.565 5.565 0 0 0-.696-7.046A5.61 5.61 0 0 0 8 0ZM0 18.333V20h16v-1.667c0-1.48-.59-2.899-1.64-3.945a5.61 5.61 0 0 0-3.96-1.634H5.6a5.61 5.61 0 0 0-3.96 1.634A5.57 5.57 0 0 0 0 18.333Z"
      fill="#00C5CD"
    />
  </SVGExt>
)

export default SvgComponent
