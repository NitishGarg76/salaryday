import * as React from "react"
import { Path, SvgAst ,Circle} from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
    <SVGExt
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      d="m3 9.735 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11Z"
      stroke={props.stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.4 22.735v-10H13v10"
      stroke={props.stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent