import * as React from "react"
import { Path, SvgAst ,Circle} from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
    <SVGExt
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Circle
      cx={9}
      cy={9}
      r={8.75}
      fill="#fff"
      stroke="#1644B6"
      strokeWidth={0.5}
    />
    <Path
      d="M11.25 9.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm0 4.95a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Z"
      fill="#1644B6"
    />
    <Path
      d="M9.872 11.975h2.75v.55h-2.75v-.55ZM8.225 13.43h-4.4a.275.275 0 0 1-.275-.275v-4.4a.275.275 0 0 1 .275-.275h7.15a.275.275 0 0 1 .275.275v.275a.275.275 0 0 0 .55 0v-.275a.824.824 0 0 0-.825-.825h-.825V6.75a2.75 2.75 0 1 0-5.5 0 .275.275 0 1 0 .55 0 2.2 2.2 0 1 1 4.4 0v1.177H3.825A.825.825 0 0 0 3 8.752v4.4a.825.825 0 0 0 .825.825h4.4a.275.275 0 0 0 0-.55v.003Z"
      fill="#1644B6"
    />
  </SVGExt>
)

export default SvgComponent