import styled from 'styled-components'
import { BorderRad, Colors, Fonts, Transitions } from '../../global/styles'

export const Button = styled.button`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  min-width: 160px;
  height: 40px;
  font-family: ${Fonts.Helvetica};
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${Colors.Black[900]};
  border: 1px solid ${Colors.Black[900]};
  border-radius: ${BorderRad.m};
  background-color: transparent;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }
`
