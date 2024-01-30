import * as React from "react";
import { Defs, Image, Path, Pattern, Use } from "react-native-svg";
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt";

const SvgComponent = (props: SVGExtProps) => (
  <SVGExt
    width={24}
    height={24}
    fill="none"
    {...props}
  >
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEd0lEQVR4nO3cT2yURRjH8e/s1rTiH/aMVgknY0MstJDYrTH+O2CsN3uTCw09SIgkJuDBi15qJEoAjTXowZOpBw80mIiSGLpbgrvbHlRMMARFejUCViXuPh66RjDbzry7877zvt3nc+28s5P32Xl+++6mA0oppZRSSimllFJKKaWUWu9M5CvKla1IbgIaTyFmM4a7YlhXdgi/Y+QymC+hcYLijm+jXO5egFMXe9l4/R2QSSAXdZ1dogG8T6HvAAMDN10ucCvAqYu9bLz2OfBEB4vrJmco9O1yKYLbO7nw2xH05kfxJL/++bbLQPsOKFe2ImYRbTtR1ZH8I4wOfrfWIPtNldyE0zj1f3ly9T22QfYba+RpL8vpRsIztiEOO4AHvCymOz1oG+DSWu5e868Nngd+clzQerKEkXHLmHtsk3Te2x8bOkmvPAzyJlDveL70awAfIH88xMjwp51O1uNhQTA8vAwcorTwCcg0yE4v86aOLGJkkpEd533N6PfTTXHbIiPbHsUwCVzzOndYy2AOcfXSsM+bD752wK2MWdmic7VZjEwBL3p/jWTNIvISo0M/xzF5fJ/vR7cvURzaneGQXgnZ4tAYo8Ox3HxI4gEreyHtNWRt/LegVjIT0v5D1qbzHVCqnqRUsz5wAGkO6eghO1fbRKk20+kL27+MK1XFYZ5lMK9z9cfDjI+7tZm52qaUhHQzZB37vEiO+doEwmEcHrQoDq15j30VoKmNLXy2OkaOYzg8tnu2hJGXI/X50sJg5BZqKYDnEDaDSG6eUnWac+fudbok+ZCOHrKVygZKlSloVHznl+cdcJsljHmVke0fO1/RzjsskrZ36HFo80vJZFtQS7Ng9lHc7vYs8F+PfQtw20V2bWYUR0Be6OiVU1AACBvS8YasTUoK0JRoSCcTsjbJhrBNIiGdqpC1SXgH3CaGkA4QsjbpakEt+QjpcCFrk4ECAFzHyGv8cum48w38+nw/PfmjAPxd38/jO684XTczk+f+LfsQ8wY+QtYmIwVoivnLsNifM1pIVwjbtBHSLgKGrE3KCgCsrGkv9TsuUK7t7ni2s9Ux/jIXwBwE8h3P51nKWlBL0UL6X0mFrE22WlBLz4F8T6l2kJkZ+ztYJEe5uhcjPwS/+Q6yUACADSBT3LelQvmb1Xt4aWGQ8sI8wjRJfMLxICsFaFolpFMcsjZZyIDVXMHIfgDEHAX6wy5nFZYMSOZH+Xj0I+az0IvoVMZa0PqjBQhMCxCYFiAwLUBgWoDAtACBaQEC0wIEpgUITAsQmBYgMC1AYFqAwLQAgWkBAtMCBKYFCEwLEJhLAW7Evor1y/q/0A5HlhHbOQldwHrvXI4sO+1lKV1JvrCNcGhBjRNk45CNtKkjPR/ZBtkLsHIW8rSPFXUXec92Zig4n5zbdwA40+mSushXFO58xWWgWwEGBm5S6NuF8C7ajtZSBzlGoe9Zv4d332pucYBcfU/zUNLN2I61XP9uAJcxnKaR/9Cl7SillFJKKaWUUkoppZRSqrv8A/Qp27QQvlJaAAAAAElFTkSuQmCC"
      />
    </Defs>
  </SVGExt>
);

export default SvgComponent;
