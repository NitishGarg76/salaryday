import * as React from "react"
import { Path, SvgAst ,Circle} from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
    <SVGExt
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M12.246 19 9.6 14.38v-.616h.308c.495 0 .91-.047 1.246-.14.345-.093.616-.247.812-.462.196-.215.313-.509.35-.882H9.6v-.896h2.702c-.065-.345-.196-.625-.392-.84a1.685 1.685 0 0 0-.798-.49c-.326-.103-.728-.154-1.204-.154H9.6v-.896h5.796V9.9H12.75c.215.177.392.387.532.63s.229.527.266.854h1.848v.896h-1.82c-.065.681-.327 1.213-.784 1.596-.448.373-1.045.611-1.792.714L13.674 19h-1.428Z"
      fill={props.stroke}
    />
    <Path
      d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2ZM16 7V3.444c0-.117-.21-.23-.586-.314A6.892 6.892 0 0 0 14 3h-4c-.53 0-1.04.047-1.414.13-.375.084-.586.197-.586.314V7"
      stroke={props.stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGExt>
)

export default SvgComponent