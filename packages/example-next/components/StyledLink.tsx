import { BorderRad, Colors, Transitions } from '@usedapp/example'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import styled from 'styled-components'

const Styled = styled.a`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 16px;
  text-transform: uppercase;
  transition: ${Transitions.all};
  white-space: nowrap;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    height: 2px;
    background-color: ${Colors.Yellow[500]};
    transform: scaleX(0);
    transform-origin: 50% 50%;
    transition: ${Transitions.all};
  }

  &:hover {
    color: ${Colors.Yellow[500]};

    &:after {
      transform: scaleX(1);
    }
  }
  &.active-page {
    background: ${Colors.Yellow[200]};
    border-radius: ${BorderRad.s};

    &:after {
      transform: scaleX(1);
    }
  }
`

export default function StyledLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter()

  return (
    <Link href={href} passHref>
      <Styled className={router.pathname === href ? 'active-page' : ''}>{children}</Styled>
    </Link>
  )
}
