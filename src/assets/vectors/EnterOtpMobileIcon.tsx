import * as React from "react"
import { Defs, Image, Path, Pattern, Use } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={44}
    height={60}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M22 19h22v22H22z" />
    <Path
      d="M6.365 0h28.074c3.088 0 5.615 2.455 5.615 5.455v8.181h-5.615V8.182H6.365v43.636h28.074v-5.454h5.615v8.181c0 3-2.527 5.455-5.615 5.455H6.365C3.277 60 .75 57.545.75 54.545V5.455C.75 2.455 3.277 0 6.365 0Z"
      fill="#0EBEC5"
    />
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACXklEQVR4nO3cvW5TMRyG8dchbQa+LgEWFgYGkgUqMVGEBFeBYGJFYqRsSCAxIDZ6FSxQhkpIkRgamPgYKy4BwVBIY3aG2uccOy/NeX6z01j/R07cqI0EAAAAAACAvgiNH/H+40UN4j2FuKkYzivoZIV9HR9RvxTivkLY0Ty80rXLX5o8PD/A3t6aDgbPpHhf0omm++yJQym81GjxQJPJn5wH5AXY3R1q7cxrBd3stL3eCO80WtzKiTDI+nnrZ58w/Cbipg7C05yV6RPw4dMFHS4+S1rruq2emWugS7oy/nrUovQJmMc7YvhtDLWId1OL0gFCvF5kO70UbqRW5LwHnCuwk75Kzi4nwKkCG+mr06kFebcgVEMAMwKYEcCMAGYEMMsJ0Pwja2TjBJgRwIwAZgQwI4AZAcy4hppxAswIYEYAMwKYEcBsuPRn3BgffauazuJ//fjCuIaa8RJkRgAzApgRwIwAZgQwS18xp7Pf4s/T20v83sEJMCOAGQHMCGBGADMCmBHAjI+jzTgBZgQwI4AZAcwIYEYAM66hZpwAMwKYEcCMAGYEqOtHagEB6vqeWsA1tKaoN6klOQGW+ufaK2SuQdxOLeIlqJagF7o6+ZZaRoA6drQeH+Ys5D2grLmCnmsUb+d+effy/0Vp9fyUtC+FtxrE7dRXFf+rdoAtbYwfV36OY63mSxDDz1DrTZjhZ6oRgOE3UDoAw2+oZACG30KpAAy/pRIBGH4HXa+hDL+jLieA4RfQNgDDL6RNAIZfUNMADL+wJgEYvsV0FjWdPXJvo7+msy33FgAAWEV/AZsdaan4PwZqAAAAAElFTkSuQmCC"
      />
    </Defs>
  </SVGExt>
)

export default SvgComponent
