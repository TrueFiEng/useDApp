import React, { useState } from 'react'
import { Label } from '../../typography/Label'
import { TextInline } from '../../typography/Text'
import { Title } from '../../typography/Title'
import { MainContent, Container, Section, SectionRow, ContentBlock, ContentRow } from '../base/base'
import { useLookupAddress, useResolveName } from '@usedapp/core'
import styled from 'styled-components'
import { BorderRad, Colors, Transitions } from '../../global/styles'
import { Button } from '../base/Button'

export const ENSExample = () => {
  return (
    <MainContent>
      <Container>
        <Section>
          <ResolveName />
          <LookupAddress />
        </Section>
      </Container>
    </MainContent>
  )
}

export const ResolveName = () => {
  const [input, setInput] = useState('')
  const [name, setName] = useState<string | undefined>(undefined)
  const { address, isLoading } = useResolveName(name)

  return (
    <>
      <SectionRow>
        <Title>Resolve name</Title>
      </SectionRow>
      <ContentBlock>
        <ContentRow>
          <InputRow>
            <Input
              id={`NameInput`}
              type="text"
              value={input}
              onChange={(e: any) => setInput(e.currentTarget.value)}
              disabled={isLoading}
            />
            <SmallButton onClick={() => setName(input)} disabled={isLoading}>
              {isLoading ? 'Loading' : 'Resolve'}
            </SmallButton>
          </InputRow>
        </ContentRow>
        <ContentRow>
          <Label>Resolved address:</Label>
          <TextInline>{address === null ? 'Address not found' : address}</TextInline>
        </ContentRow>
      </ContentBlock>
    </>
  )
}

export const LookupAddress = () => {
  const [input, setInput] = useState('')
  const [address, setAddress] = useState<string | undefined>(undefined)
  const { ens, isLoading } = useLookupAddress(address)

  return (
    <>
      <SectionRow>
        <Title>Lookup address</Title>
      </SectionRow>
      <ContentBlock>
        <ContentRow>
          <InputRow>
            <Input
              id={`AddressInput`}
              type="text"
              value={input}
              onChange={(e: any) => setInput(e.currentTarget.value)}
              disabled={isLoading}
            />
            <SmallButton onClick={() => setAddress(input)} disabled={isLoading}>
              {isLoading ? 'Loading' : 'Lookup'}
            </SmallButton>
          </InputRow>
        </ContentRow>
        <ContentRow>
          <Label>Found name:</Label>
          <TextInline>{ens === null ? 'No name found' : ens}</TextInline>
        </ContentRow>
      </ContentBlock>
    </>
  )
}

const Input = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 0 0 24px;
  border: 0;
  border-radius: ${BorderRad.m};
  -moz-appearance: textfield;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
  }
`

const InputRow = styled.div`
  height: 44px;
  display: flex;
  margin: 0 auto;
  color: ${Colors.Gray['600']};
  align-items: center;
  border: ${Colors.Gray['300']} 1px solid;
  border-radius: ${BorderRad.m};
  overflow: hidden;
  transition: ${Transitions.all};

  &:hover,
  &:focus-within {
    border-color: ${Colors.Black[900]};
  }
`

const SmallButton = styled(Button)`
  display: flex;
  justify-content: center;
  min-width: 95px;
  height: 100%;
  padding: 8px 24px;

  &:disabled {
    color: ${Colors.Gray['600']};
    cursor: unset;
  }

  &:disabled:hover,
  &:disabled:focus {
    background-color: unset;
    color: unset;
  }
`
