import React from 'react'
import { useCoingeckoPrice, useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { useUniswapPrice } from '@usedapp/uniswap'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'
import { formatEther, parseEther } from 'ethers'

const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'

export function Prices() {
  const geckoEtherPrice = useCoingeckoPrice('ethereum', 'usd')
  const geckoWethPrice = useCoingeckoTokenPrice(WETH_ADDRESS, 'usd')

  const uniWethPrice = useUniswapPrice(WETH_ADDRESS, DAI_ADDRESS)
  const uniWethPriceRounded = uniWethPrice ? uniWethPrice - (uniWethPrice % parseEther('0.01')) : undefined

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Coingecko</Title>
          </SectionRow>
          <ContentBlock>
            {geckoEtherPrice && (
              <ContentRow>
                <Label>Ethereum price:</Label> <Label>$ </Label>
                <TextInline>{geckoEtherPrice}</TextInline>
              </ContentRow>
            )}
            {geckoWethPrice && (
              <ContentRow>
                <Label>WETH price:</Label> <Label>$ </Label>
                <TextInline>{geckoWethPrice}</TextInline>
              </ContentRow>
            )}
          </ContentBlock>
        </Section>

        <Section>
          <SectionRow>
            <Title>Uniswap</Title>
          </SectionRow>
          <ContentBlock>
            {uniWethPriceRounded && (
              <ContentRow>
                <Label>WETH price:</Label> <Label>$ </Label>
                <TextInline>{formatEther(uniWethPriceRounded)}</TextInline>
              </ContentRow>
            )}
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
