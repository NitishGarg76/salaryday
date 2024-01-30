import * as React from "react";
import { Path, Defs, Pattern, Image, Use } from "react-native-svg";
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt";

const SvgComponent = (props: SVGExtProps) => (
  <SVGExt width={24} height={24} fill="none" {...props}>
    <Path fill="url(#a)" d="M0 0h24v24H0z" />
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACcElEQVR4nO3dP08TcRzH8c/3jrBQExfbTspsEyeeAJFqUlh5BODgTuKDMMQYwwZPgF1SCzwEBhd0JC7Cib3EPxO9+7k4MGjJ99fWj9x9Xiv5HJe+c7QkzR0gIiJ1ZbP+Bc2VgzDu59lRb+bnMA77/JJZHlxupgBkCkCmAGQKQKYAZApANvFn3PZyv1Ok5aYZughYBLAwhfP6n/2E4QwhDJJgu+fHvdNJDhYdoLO+P3+ZN7YD8BxAOslJ3GKFWdi5GLa2cLJ0FXOAqACd9f35L/nCW8BWYvaVYzjMhs3VmAhR7wGXeWNbL/41Ad17d7OXMVP3FdBe7nfKtHyP+v7Z+ZtRivLR56O1D56R+wookvIZ9OL/yVxh6aZ35A5ghq53UxshPPFOYt4D7kds6uKBdxAToBGxqYs73oH+EyZTADIFIFMAMgUgUwAyBSBTADIFIFMAMgUgm5v2Adnf9Zy1m75L6qUrgEwByBSATAHIFIBMAcgUgEwByBSATAHIFIBMAcgUgEwByBSATAHIFIBMAcgUgEwByBSATAHIFIBMAcgUgEwByBSATAHIFIBMAcgUgEwByBSATAHIFIBMAcgUgEwByBSATAHIFIBMAcgUgCzmXhHfMeb+mNO+l8It88078F8Bhk/uTX24Xxt/gBAG7k199L0Dd4Ak2C6AwrurgVGRpHvekTvA+XHv1CzseHfVF958HTz96F1FfQq6GLa2YDiM2VbUIMtbL2KGcR9DT5ausmFzNQS8BjCKOkY1jIDwKsuba//0IT7XtR8fPCwT2/j98IJFVP/29j8AnCHgXWrlnveRJSIiIiIiIiIiUl+/AK1tfcS1i7AjAAAAAElFTkSuQmCC"
      />
    </Defs>
  </SVGExt>
);

export default SvgComponent;
