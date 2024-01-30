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
      d="M12.246 18 9.6 13.38v-.616h.308c.495 0 .91-.047 1.246-.14.345-.093.616-.247.812-.462.196-.215.313-.509.35-.882H9.6v-.896h2.702c-.065-.345-.196-.625-.392-.84a1.685 1.685 0 0 0-.798-.49c-.326-.103-.728-.154-1.204-.154H9.6v-.896h5.796V8.9H12.75c.215.177.392.387.532.63s.229.527.266.854h1.848v.896h-1.82c-.065.681-.327 1.213-.784 1.596-.448.373-1.045.611-1.792.714L13.674 18h-1.428Z"
      fill={props.stroke}
    />
    <G clipPath="url(#a)">
      <Path
        d="m2.883 16.203.46.796a10 10 0 1 0 .565-10.88"
        stroke={props.stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Path
      d="m2.132 3.57 1.07 4.264 4.264-1.07"
      stroke={props.stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="matrix(-1 0 0 1 24 0)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </SVGExt>
)

export default SvgComponent