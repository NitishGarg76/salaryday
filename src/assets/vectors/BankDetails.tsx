import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={24}
    height={21}
    fill="none"
   
    {...props}
  >
    <Path
      d="M10.71.519A2.421 2.421 0 0 1 12 .154c.464 0 .915.128 1.29.365l9.276 5.867c1.222.771.593 2.445-.917 2.448H2.35C.84 8.831.212 7.157 1.433 6.386L10.709.519h.001Zm2.54 4.252c0-.288-.132-.563-.366-.766A1.354 1.354 0 0 0 12 3.687c-.332 0-.65.114-.884.318a1.016 1.016 0 0 0-.366.766c0 .287.132.563.366.766.235.203.553.317.884.317.332 0 .65-.114.884-.317.234-.204.366-.479.366-.766Zm-2.188 10.562h-2.5V9.916h2.5v5.417Zm4.376 0h-2.5V9.916h2.5v5.417Zm4.687 0h-2.813V9.916h2.813v5.417Zm.313 1.083H3.563c-.746 0-1.462.257-1.99.714-.527.457-.823 1.078-.823 1.724v.542c0 .45.42.812.938.812h20.625c.248 0 .487-.085.662-.238a.762.762 0 0 0 .275-.574v-.542c0-.646-.296-1.267-.824-1.724-.527-.457-1.243-.713-1.988-.713Zm-13.75-1.083H3.874V9.916h2.813v5.417Z"
      fill="#00C5CD"
    />
  </SVGExt>
)

export default SvgComponent
