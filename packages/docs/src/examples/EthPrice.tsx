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
        <div id="Balance_DvYH">
            Ether price: 
            <p id="Bold_yXij">{etherPrice} $</p>
        </div>
    )
}
