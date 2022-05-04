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
        <div id="Balance_src-examples-styles-styles-module">
            Ether price: 
            <p id="Bold_src-examples-styles-styles-module">{etherPrice} $</p>
        </div>
    )
}
