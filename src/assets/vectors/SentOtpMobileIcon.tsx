import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={51}
    height={61}
    fill="none"
    {...props}
  >
    <Path
      d="m30.592 34.983-7.159-6.954-3.565 3.463 10.696 10.391L50.75 22.274l-3.565-3.463-16.592 16.172Z"
      fill="#0EBEC5"
    />
    <Path
      d="M6.365.974H34.44c3.089 0 5.615 2.455 5.615 5.455v8.181H34.44V9.157H6.365v43.636H34.44v-5.454h5.615v8.182c0 3-2.526 5.454-5.615 5.454H6.365C3.277 60.974.75 58.52.75 55.52V6.429c0-3 2.527-5.455 5.615-5.455Z"
      fill="#0EBEC5"
    />
  </SVGExt>
)

export default SvgComponent
