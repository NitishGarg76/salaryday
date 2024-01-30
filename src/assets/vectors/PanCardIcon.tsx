import * as React from "react";
import { Path, Defs, Pattern, Use, Image } from "react-native-svg";
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt";

const SvgComponent = (props: SVGExtProps) => (
  <SVGExt
    width={54}
    height={54}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" fillOpacity={0.5} d="M0 0h54v54H0z" />
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAErElEQVR4nO3cz28UZRzH8fez21/E1XLwpAZJvIjLQdit0W2rrcWQcPAPIKgNKALxRjx682hijBowwcJBgtdeNCCChG4PLVs5WOhBCcF6I1pwa0vbna+HVsXZ6Y/dnXme2c73lfTy7DM7353Pzuw8z0wHlFJKKaWUUkljXBdQs2JJ1ny9O9dUnynluoCk0wAc0wAc0wAc0wAc0wAc0wAcW/+cuTi+E1Jvg+xBzHYMj1ioa3XrneevN06ImjCLkdtgLoJ3iu6un9bqvvqHmZxsY2b+Y+AIcdpT4h7A/1UwnKCz4zjZ7EJQh+ANu7zxvwWOrdpHbUQa4T1m5r9hcrItqEPwxl3+5r8aZWUJM8DM3EdBL1QHUBzfCbwbdUXJY44xcj3rbw3YA9LvAGkLFSVNmlTlkL+xOgAje6yUk0TCa/6m6gCEbVaKSaan/Q0tAZ0yFgqpX7xOM2v1qL9BTzEd0wAc0wAc0wAc0wAc0wAc0wAccxCAGUPMUcR7lnJLhnJLBiM7EHMUGLdfj1tBA7GolDHmMC/t+hpj/IOpKWAKkS8oTuzHcJK4DwhDYmsPKOPRR2H3uYCN/x9jhJ7cWTz6EGYt1eaUnQCMOUxvrrTh/r25EoYjEVYUG9WX90KfazFjFHa9uOY3P4iIYXRiDMg3tPqo7xWtdXv56ol+DzAyVPPGh+XDEXI6gopiJfoAPO+Hupc1XAqxkliKPoDZtum6l32wpf5lm0T0AbS11H8Mbv2jqe71r0f0AbT+9WTdy6a3PBViJbFk4UfY1H97S4WBECuJJQvjgNQgIrUfSkQMhrciKChWLExFyAsUJ/YDZ2tabPTHAzQ6BoDYX0O2NBLmJFdLuQ33v1rKIXIiwopiw9ZcUAbDFYqlA2sejkQMxYk3MFxxfhe2JRamIqpcAzlNylzmfssdAB5b2oYn/RhzEGHje0oz8k1F2JyO/kceTB4PyCwtt3gABmJ9tI6GXhFzTANwTANwzMZvwANgBCgBNzHeDSrcJb04Q2dnGYB79zJUWreS5nEk9Rywg+UxQA8Q+J8lGxa36wE+UQXgIQyDOcNi+yX6s+V1+v++8ncLGPu39fJkhraFAfAGgdfZhHts2AEIcAbP+5DerlsNv9tycMPAMMVrz2BSHyDyJs34lJdVhBiATCNykJ6u78J7z4d0538BBhktnUMYAp6IZD2WhbRLyzTQF9nGf1ghdx7DK8Bvka/LgjACmKOS2rvyDbWjkPsZSe8F5q2tMyKNByB8zsu7b4RQS216np/E0PQTdo0HYFK1TTOHychXztYdksZ/hBdmpkKooz6ycBPa1+6z6a8H9Pe7Ow4XCnPO1h2STTewaTYagGON/wbE/Bgbd7oHOKYBOKYBOKYBOKYBOKYBOKYBOBYUwJ/Wq0iO+/6GgEeW8auVUpLpjr+hOgCPC1ZKSSRz3t8S9NTEU0DFQjVJU6HCkL+xOoBNcqUphj4LunIYfBbU2XEc+D7qihJDuEi7vB/0UnAA2ewCWzv2gXyKHo4asQR8QofsI59fDOqw/g1OI9ezpCqHVh46up2EPMWkAWXgNsgFKqkvndywoJRSSimllFJKKaWUUkqpWPkbjTwmtKxovhkAAAAASUVORK5CYII="
      />
    </Defs>
  </SVGExt>
);

export default SvgComponent;
