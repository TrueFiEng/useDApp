import styled from 'styled-components'
import { Colors } from '../../design'

export const SubmitButton = styled.input`
  display: inline-block;
  position: relative;
  top: 0;
  border: 1px solid ${Colors.Border2};
  border-radius: 4px;
  box-shadow: 0 4px 0 0 ${Colors.Border2};
  margin-bottom: 4px;
  background-color: ${Colors.Background2};
  cursor: pointer;
  padding: 4px 8px;
  font-family: inherit;
  font-size: inherit;
  transition: box-shadow 0.1s ease-out, top 0.1s ease-out;

  &:hover {
    background-color: ${Colors.Background};
  }

  &:active {
    top: 3px;
    box-shadow: 0 1px 0 0 ${Colors.Border2};
  }
`
