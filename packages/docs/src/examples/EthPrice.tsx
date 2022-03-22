import React from 'react'
import ReactDOM from 'react-dom'
import { useCoingeckoPrice } from '@usedapp/coingecko'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

export function App()  {
    const etherPrice = useCoingeckoPrice('ethereum', 'usd')

    return (<p>Ether price: {etherPrice} $</p>)
}
