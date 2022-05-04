import React from 'react'
import ReactDOM from 'react-dom'
import { useCoingeckoPrice } from '@usedapp/coingecko'
import styles from './styles/styles.module.css'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

export function App()  {
    const etherPrice = useCoingeckoPrice('ethereum', 'usd')

    return (<div className={styles.Balance}>Ether price: <p className={styles.Bold}>{etherPrice} $</p></div>)
}
