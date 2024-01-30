import * as React from "react"
import { Circle, Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={100}
    height={100}
    fill="none"
    {...props}
  >
    <Circle cx={50} cy={50} r={50} fill="#00C5CD" />
    <Circle cx={50} cy={50} r={45} fill="#fff" />
    <Path
      d="M50 20c-12.73 0-23.111 10.78-23.111 24v5.707C25.232 51.348 24 53.459 24 56c0 3.726 2.477 6.489 5.614 7.84C33.373 73.17 40.901 80 50 80c9.1 0 16.627-6.83 20.386-16.16C73.523 62.489 76 59.726 76 56c0-2.54-1.231-4.652-2.889-6.293V44c0-13.22-10.381-24-23.111-24Zm0 6c7.672 0 14.129 5.122 16.425 12.264a8.193 8.193 0 0 0-1.98-.264h-28.89c-.683 0-1.34.105-1.98.264C35.871 31.122 42.328 26 50 26ZM35.556 44h28.888c1.633 0 2.89 1.305 2.89 3v5.555l1.45.861c.877.523 1.438 1.429 1.438 2.584 0 1.545-1.065 2.738-2.488 2.941l-1.693.246-.615 1.653C62.448 68.898 56.524 74 50 74c-6.524 0-12.448-5.102-15.426-13.16l-.615-1.653-1.693-.246c-1.423-.203-2.488-1.396-2.488-2.941 0-1.155.561-2.061 1.439-2.584l1.45-.861V47c0-1.695 1.256-3 2.889-3Z"
      fill="#00C5CD"
    />
  </SVGExt>
)

export default SvgComponent