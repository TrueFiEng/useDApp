import styled from 'styled-components'
import { Colors } from '../../../../design'

export const Table = styled.table``

export const Row = styled.tr``

export const Property = styled.td`
  text-align: right;
  font-size: 14px;
  padding-right: 8px;
  padding-top: 2px;
  vertical-align: baseline;
  color: ${Colors.Text2};
`

export const Value = styled.td`
  user-select: text;
`
