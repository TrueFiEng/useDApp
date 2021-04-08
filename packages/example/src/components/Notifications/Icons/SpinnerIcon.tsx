import React from 'react'
import styled from 'styled-components'

export const SpinnerIcon = () => (
  <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <Circle cx="50" cy="50" r="40" />
  </Svg>
)

const Svg = styled.svg`
  animation: 1s linear infinite svg-animation;

  @keyframes svg-animation {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`

const Circle = styled.circle`
  fill: transparent;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-dasharray: 280;
  stroke-dashoffset: 100;
  stroke-width: 8px;
`
