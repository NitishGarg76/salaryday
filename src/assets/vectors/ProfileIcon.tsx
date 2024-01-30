import * as React from "react"
import { Path, SvgAst ,Circle, G, Defs, ClipPath} from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
    <SVGExt
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
      stroke={props.stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
      stroke={props.stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent