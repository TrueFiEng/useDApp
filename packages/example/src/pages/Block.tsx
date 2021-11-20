import React from 'react'
import { useBlockMeta, useBlockMeta2, useBlockNumber, useBlockNumber2, useEthers } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'

export function Block() {
  const blockNumber = useBlockNumber()
  const blockNumber2 = useBlockNumber2()
  const { chainId } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()
  const { timestamp: timestamp2, difficulty: difficulty2 } = useBlockMeta2()
  return (
    <MainContent>
      <Container>
        <Section>
          <ContentBlock>
            <ContentRow>
              <Label>Chain id:</Label> <TextInline>{chainId}</TextInline>
            </ContentRow>
            <ContentRow>
              <Label>Current block:</Label> <TextInline>{blockNumber}</TextInline>
              &nbsp;<Label>dAppService:</Label> <TextInline>{blockNumber2}</TextInline>
            </ContentRow>
            {difficulty && (
              <ContentRow>
                <Label>Current difficulty:</Label> <TextInline>{difficulty.toString()}</TextInline>
                {difficulty2 && (
                  <>
                    &nbsp;<Label>dAppService:</Label> <TextInline>{difficulty2.toString()}</TextInline>
                  </>
                )}
              </ContentRow>
            )}
            {timestamp && (
              <ContentRow>
                <Label>Current block timestamp:</Label> <TextInline>{timestamp.toLocaleString()}</TextInline>
                {timestamp2 && (
                  <>
                    &nbsp;<Label>dAppService:</Label> <TextInline>{timestamp2.toLocaleString()}</TextInline>
                  </>
                )}
              </ContentRow>
            )}
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
