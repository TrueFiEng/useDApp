import React from 'react'
import ReactDOM from 'react-dom'
import { useCoingeckoPrice } from '@usedapp/coingecko'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

export function App()  {
    const etherPrice = useCoingeckoPrice('ethereum', 'usd')

    return (
        <div className="balance">
            Ether price: 
            <p className="bold">{etherPrice} $</p>
        </div>
    )
}
