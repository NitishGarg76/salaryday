import * as React from "react"
import { ClipPath, Defs, G, Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M15.333 12.667A1.334 1.334 0 0 1 14 14H2a1.334 1.334 0 0 1-1.333-1.333V5.333A1.333 1.333 0 0 1 2 4h2.667L6 2h4l1.333 2H14a1.333 1.333 0 0 1 1.333 1.333v7.334Z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 11.333A2.667 2.667 0 1 0 8 6a2.667 2.667 0 0 0 0 5.333Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </SVGExt>
)

export default SvgComponent
