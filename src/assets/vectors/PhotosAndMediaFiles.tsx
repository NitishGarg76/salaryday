import * as React from "react"
import { Defs, Image, Path, Pattern, Use } from "react-native-svg"
import SVGExt, { SVGExtProps } from "../../components/global/SVGExt"

const SvgComponent = (props:SVGExtProps) => (
  <SVGExt
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h30v30H0z" />
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEL0lEQVR4nO3dzYtbZRTH8e9JppnWCu1aKpXSTalFcNJFJ4gItSiItQP9B8RWhG7E0biburKdjlTQjWDXbtR2uqhv4KYmXcy9uBFUii+I4tq20mmmk+MiHRAtTe5zn5fc5nxgNpM85zm5v9wX7pPJgDHGGGOMMWbSSOERV/I9KMdQPYTKIwhbA/TlT2um+GuMaGrkZ2bZJlZlkT4nBuPEJT7zH6MFMNj4FxGeCdzPxKmN9KxVWbSNH8bwAK7kexBOROhlIg0PYJ3jFDlXmEKGByD6dIQ+JtYI5wDZGb6NyTXKoeXBez465tfZ4260qyATjAWQmAWQmAWQmAWQmAWQmAWQWPxbDN1sH1p7CdGD9Nk5husJb9GaORlrsngBXLo6zbbrZ1F9GbSGMq7rCQt0cmKFEOcQdOnqNNuufQb6SrQ5y1mgk99HAWz/613gqShz+RMlhPABdLN9qBwPPk8YwUMIH4ByLMo84SzQyU6FKh5hw8jB8HOEJu1Qe0KMd+bDEeaIIcieEOMydLzWEzq5ug+WNp0MWs03fbVT5WNzItL2uSdYAE78hWABOPMTggVQSvkQLIDSyoVgAXjhHoIF4I1bCBaAV9IuOsICSMwCSMwCSCz9x85L3ZupPtsDErMAErMAErMAErMAErMAErMAErMAErMAErMAErMAEht+L6gafwfcA86DXEDXv+Xvxu8AbO3toFZ/HNXDwBGgkbLJu0l/M640/Zi+tnli/893efDHOz8fcXllF/XaGZS5yA3eU/h3d7i7neugbVrNdwqN6mbzqJwC6kG6KnjEqPA5wGHjA8w2lxD19tHCsqoawCdOG3/DbHMJ4VOP/TirYgA90MKL3/+zNjUP3CrfTjlVDOA8reZPpas8+dgvIBc99FNKBQOQC95KqS57q+WoegHUJfdXrJ/5q+WmegHcbPzprdbaA394q+WoegH4tOV68tefvIHCptYe8larP+WvlqPqBVDvz3irpdL0VstR9QIY3FjzRJ73V8tN9QKAObr57tJVLq/sAp9huqliAJuA06WrSG2JMbg9XcUAQJmjk73mPP6b/HWEIx47clbNAACQ03Sz+cLDutk8wtsBGnJS5QWZOipn6OYHUH1j6P2hbr6bPovoeLzzN1R5QebfeiDLqC5T05xbWwZLktM3d9CXGURfADnM4PwRVsEFmRh7wA2GfV9EeQ3QowhHUYHG6uC3uvFvVqIta18rOiD8OUD4Lfgc46Pwa43xhU1fBZ9jXCifFx0S4Sqo/yGwHn6e5G5T03NFB4UPoLX/O+CD4POkJrzHbPOHosMifWvi5leBr6PMlcaXNNzWqeMEsHdvj+2bn0V4n/vrcHQb4SzT+hzN5ppLgfgfO+ysPIrUXkT10J3/TxP6EtW3G8CvIF9Q03McmPk+dUPGGGOMMcYYY4wxphr+ASA2963VvnUAAAAAAElFTkSuQmCC"
      />
    </Defs>
  </SVGExt>
)

export default SvgComponent
