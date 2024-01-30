import * as React from "react"
import { Defs, Image, Path, Pattern, Use } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h16v16H0z" />
    <Defs>
      <Pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#b" transform="scale(.01042)" />
      </Pattern>
      <Image
        id="b"
        width={96}
        height={96}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </SVGExt>
)

export default SvgComponent
