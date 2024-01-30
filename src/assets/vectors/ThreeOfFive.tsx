import * as React from "react"
import { Circle, Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={60}
    height={60}
    fill="none"
    {...props}
  >
    <Circle cx={30} cy={30} r={28} stroke="#00C5CD" strokeWidth={4} />
    <Path
      d="M58 30c0 14.5-11.431 28-28 28C13.431 58 2 45 2 30S13.431 2 30 2"
      stroke="#1644B6"
      strokeWidth={4}
    />
    <Path
      d="M11.363 27.713c.075-.509.217-.952.427-1.33.215-.378.478-.693.791-.945a3.198 3.198 0 0 1 1.085-.56 4.394 4.394 0 0 1 1.31-.189c.503 0 .951.072 1.343.217.392.14.723.331.994.574a2.47 2.47 0 0 1 .826 1.855c0 .322-.033.607-.098.854a1.953 1.953 0 0 1-.294.637 1.773 1.773 0 0 1-.476.455 2.948 2.948 0 0 1-.644.308c1.13.397 1.694 1.167 1.694 2.31 0 .541-.098 1.013-.294 1.414a2.89 2.89 0 0 1-.79 1.001 3.378 3.378 0 0 1-1.142.602c-.434.13-.887.196-1.358.196-.485 0-.917-.051-1.295-.154a3.071 3.071 0 0 1-1.008-.49 3.353 3.353 0 0 1-.777-.854 5.81 5.81 0 0 1-.574-1.232l.966-.392c.252-.098.485-.124.7-.077a.657.657 0 0 1 .462.322c.21.387.432.67.665.847.238.173.516.259.833.259.243 0 .453-.04.63-.119a1.318 1.318 0 0 0 .721-.756c.06-.163.091-.329.091-.497 0-.22-.016-.415-.049-.588a.757.757 0 0 0-.252-.455c-.14-.126-.352-.222-.637-.287-.28-.07-.672-.105-1.176-.105v-1.498c.425 0 .768-.033 1.03-.098.26-.065.461-.154.601-.266a.825.825 0 0 0 .287-.42 1.96 1.96 0 0 0 .07-.539c0-.401-.098-.71-.294-.924-.191-.22-.485-.329-.882-.329a1.301 1.301 0 0 0-1.274.889c-.098.257-.226.427-.385.511-.159.084-.385.103-.679.056l-1.148-.203Zm14.826-.084c.551 0 1.053.086 1.505.259.453.173.84.42 1.162.742.327.322.58.714.756 1.176.182.457.273.973.273 1.547 0 .579-.09 1.101-.273 1.568-.177.462-.429.856-.756 1.183-.322.322-.709.572-1.162.749a4.192 4.192 0 0 1-1.505.259 4.27 4.27 0 0 1-1.519-.259 3.495 3.495 0 0 1-1.176-.749 3.424 3.424 0 0 1-.763-1.183 4.387 4.387 0 0 1-.266-1.568c0-.574.09-1.09.266-1.547a3.35 3.35 0 0 1 .763-1.176c.332-.322.724-.57 1.176-.742a4.27 4.27 0 0 1 1.52-.259Zm0 5.873c.5 0 .866-.175 1.1-.525.237-.355.356-.891.356-1.61 0-.719-.119-1.253-.357-1.603-.233-.35-.6-.525-1.099-.525-.513 0-.889.175-1.127.525-.238.35-.357.884-.357 1.603s.12 1.255.357 1.61c.238.35.614.525 1.127.525ZM31.312 35v-5.768l-.476-.098a1.015 1.015 0 0 1-.399-.175c-.098-.08-.147-.196-.147-.35v-.854h1.022v-.413c0-.415.065-.791.196-1.127.135-.336.327-.623.574-.861a2.62 2.62 0 0 1 .917-.553c.36-.13.768-.196 1.225-.196.177 0 .34.012.49.035.15.019.306.051.47.098l-.043 1.057a.392.392 0 0 1-.056.189.413.413 0 0 1-.133.119.657.657 0 0 1-.168.063.807.807 0 0 1-.182.021c-.191 0-.362.019-.51.056a.826.826 0 0 0-.379.203.887.887 0 0 0-.224.378c-.051.154-.077.35-.077.588v.343h1.701v1.484h-1.63V35h-2.17Zm9.928-6.608c.191-.037.375-.063.553-.077.177-.014.35-.021.518-.021.536 0 1.01.082 1.42.245.411.163.757.387 1.037.672.28.28.49.611.63.994.144.378.217.784.217 1.218a3.73 3.73 0 0 1-.294 1.498 3.44 3.44 0 0 1-.805 1.162 3.669 3.669 0 0 1-1.24.763 4.46 4.46 0 0 1-1.567.266c-.332 0-.649-.035-.952-.105a4.87 4.87 0 0 1-.847-.28 4.992 4.992 0 0 1-.728-.413 5.073 5.073 0 0 1-.61-.504l.673-.896a.696.696 0 0 1 .245-.21.615.615 0 0 1 .3-.077c.14 0 .272.04.393.119.126.075.261.159.406.252.15.089.322.17.518.245.196.075.438.112.728.112s.536-.047.742-.14c.205-.098.37-.229.497-.392.13-.168.224-.362.28-.581a2.72 2.72 0 0 0 .09-.714c0-.495-.14-.87-.42-1.127-.28-.261-.676-.392-1.19-.392a3.64 3.64 0 0 0-1.343.259l-1.344-.364.868-5.103h5.222v.896c0 .15-.023.285-.07.406a.838.838 0 0 1-.224.322 1.04 1.04 0 0 1-.392.21c-.163.047-.36.07-.588.07h-2.436l-.287 1.687Z"
      fill="#00C5CD"
    />
  </SVGExt>
)

export default SvgComponent