import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export function TopBar() {
  return (
    <Bar>
      <Link to="/balance"> Balance </Link>
      <Link to="/block"> Block </Link>
      <Link to="/tokens"> Tokens </Link>
    </Bar>
  )
}

const Bar = styled.header`
  background-color: white;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: left;
  padding: 12px 24px;
  a {
    margin: 0px 10px;
  }
`
