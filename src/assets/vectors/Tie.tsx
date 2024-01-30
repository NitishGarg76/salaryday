import * as React from 'react';
import { Path, Defs, Pattern, Use, Image } from 'react-native-svg';
import SVGExt, { SVGExtProps } from '../../components/global/SVGExt';

export default ({
  boldness,
  ...props
}: SVGExtProps) => {
  return (
    <SVGExt
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h36v36H0z" />
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADPElEQVR4nO2cP07UQRiGnyHEbMkJzPZ0u1thRCm8gbU34AzGylhbySG4giQmSwVW9FZa2GiHmyxrsxPDOgLCzLzvZr/nAL/54vvPQAIEQRAEQRAEQbBpJPUBTM8/slg8l7yd0gl7owPJ20u2lI8DMJ+/2ci3l+gTAJoUGLgfHBIAGicauB9cEgB9U2DifnBJAPR1pIn7wSkB0CcFRu4HpwRAH2cauR/cEgBtU2DmfnBLALR1qJn7wTEB0CYFhu4HxwRAG6cauh9cEwB1U2DqfnBNANR1rKn7wTkBUCcFxu4H5wRAHecaux/cBdje/mLxjYZ4C3B19fARrvGNhngLAM9MvtEMdwFquDcScC9OPw+BYYUvDZffssRXgJrdbbwDvgLU7W7bHXAWoKZrIwH/Rb3+z9jugKcALTrbdAc8BWjT2ZY74CpAC7dGAu5E/f7PWO6AnwAtu9pwB/wEaNvVdjvgKEBLl0YCbqRd/2fsdsBLgB4dbbYDXgL06WirHXAToIc7IwFF2vd/xmoHfATo2c1GO+AjQN9uttkBJwF6ujIScI1+/Z+x2QEPARSdbLIDHgJoOtliB1wEULgxEgAo+j9jsQN6AZRdbLADegG0XSzfAQcBlC7c8ATo+j8j3wGtAAYdrL5BXUHyDkZ8g1oAfQLEN+gE0Pd/RroDOgEc+j8jvEVZQQ79n5HdohTAJwHCWzQC+PR/RrYDGgGc+j8juklVQU79n5HcpBLALwGim/oL4Nf/GckO9BfAsf8zgtsUFeTY/5nutykE8E2A4Lb+AqT0Grjs/u7tzEi87f2o5k+WfTobs8Ux8Fjy/t98hfSSJ6PT3g9r/hv6dHzGPE1I6UTy/nWmzBcTxT8+KH8WtD/6zq+fL2DxTnYDHLEzOGB/8k11gMdfTZyev2Kx+AAMOr04I3HI3vio03v/xEMA6LkLsr4vof6V5B/67IK070v4CACtd0He9yV8KmiVertg0/clfAWAGrtg1fclvCpolYftgl3fl/AWAO67C5Z9X8K7gla5fRes+77EegkAN+2Cfd+X8K+gVcq7sBZ9X2L9EpC5uHjEj8v3AOwMDtndnYkvCoIgCIIgCIIguBO/AS+tKY1SX48MAAAAAElFTkSuQmCC"
      />
    </Defs>
  </SVGExt>
  );
};