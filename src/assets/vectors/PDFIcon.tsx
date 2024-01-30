import * as React from "react"
import { Path } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={33}
    height={43}
    fill="none"
    {...props}
  >
    <Path
      d="M23.397.25H1.242C.625.25.125.75.125 1.72v40.517c0 .263.5.763 1.117.763h30.592c.617 0 1.117-.5 1.117-.763v-32.08c0-.531-.071-.702-.196-.828L23.872.446a.675.675 0 0 0-.475-.196Z"
      fill="#E9E9E0"
    />
    <Path d="M23.79.365v9.046h9.046L23.79.365Z" fill="#D9D7CA" />
    <Path
      d="M10.06 25.69c-.266 0-.52-.087-.738-.25-.795-.596-.902-1.26-.852-1.711.14-1.243 1.676-2.544 4.57-3.869 1.148-2.516 2.24-5.616 2.891-8.207-.762-1.658-1.502-3.809-.962-5.07.189-.443.425-.782.865-.928.174-.058.614-.132.776-.132.384 0 .723.496.962.801.226.287.736.896-.284 5.193 1.029 2.125 2.487 4.29 3.884 5.773 1-.181 1.862-.274 2.563-.274 1.196 0 1.92.279 2.216.853.244.475.144 1.03-.298 1.649-.425.595-1.012.91-1.695.91-.928 0-2.01-.587-3.214-1.745a36.583 36.583 0 0 0-6.74 2.154c-.638 1.354-1.25 2.445-1.819 3.245-.782 1.096-1.457 1.607-2.125 1.607Zm2.032-3.914c-1.631.917-2.296 1.67-2.344 2.095-.008.07-.029.255.329.528.113-.036.777-.339 2.015-2.623Zm10.41-3.39c.623.478.774.72 1.181.72.179 0 .688-.008.924-.337.114-.16.158-.262.176-.317-.094-.05-.219-.15-.897-.15-.386 0-.87.017-1.384.083ZM16.8 13.36a54.419 54.419 0 0 1-2.042 5.775 38.14 38.14 0 0 1 4.96-1.542c-1.031-1.197-2.06-2.692-2.918-4.233Zm-.463-6.46c-.075.026-1.016 1.342.073 2.456.724-1.615-.04-2.466-.073-2.455ZM31.834 43H1.242c-.617 0-1.117-.5-1.117-1.117v-11.86h32.826v11.86c0 .617-.5 1.117-1.117 1.117Z"
      fill="#CC4B4C"
    />
    <Path
      d="M8.435 40.71H7.182v-7.692h2.212c.327 0 .65.052.97.156.32.105.608.261.862.47.254.208.46.46.616.756.156.296.235.628.235.997 0 .39-.066.743-.198 1.06a2.214 2.214 0 0 1-.554.798 2.494 2.494 0 0 1-.856.501 3.294 3.294 0 0 1-1.106.177h-.929v2.777Zm0-6.742v3.047h1.148c.153 0 .304-.026.454-.079.15-.052.287-.137.412-.255.126-.119.226-.284.303-.496a2.348 2.348 0 0 0 .062-1.22 1.252 1.252 0 0 0-.213-.47 1.266 1.266 0 0 0-.455-.376c-.194-.1-.452-.15-.772-.15h-.94v-.002ZM19.759 36.65c0 .633-.068 1.174-.204 1.623a4.035 4.035 0 0 1-.517 1.128c-.209.303-.443.54-.704.715a3.534 3.534 0 0 1-.757.392 3.134 3.134 0 0 1-.668.167 4.45 4.45 0 0 1-.449.035H13.55v-7.692h2.317c.647 0 1.216.103 1.706.307.49.205.898.48 1.221.82.324.34.565.729.726 1.163.16.435.24.883.24 1.342Zm-3.715 3.141c.848 0 1.46-.27 1.836-.813.376-.543.564-1.33.564-2.36 0-.32-.038-.636-.115-.949a2.031 2.031 0 0 0-.443-.85c-.22-.255-.517-.46-.893-.616-.375-.157-.862-.236-1.46-.236h-.731v5.824h1.242ZM22.849 33.968v2.421h3.214v.856H22.85v3.465h-1.274v-7.692h4.811v.95H22.85Z"
      fill="#fff"
    />
  </SVGExt>
)

export default SvgComponent