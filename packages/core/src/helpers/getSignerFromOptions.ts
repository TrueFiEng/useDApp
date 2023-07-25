import { Wallet, type Provider, type JsonRpcProvider, type FallbackProvider } from 'ethers'
import { TransactionOptions } from '../model'


export const getSignerFromOptions = (
  provider: Provider,
  options?: TransactionOptions,
  library?: JsonRpcProvider | FallbackProvider
) => {
  const privateKey = options && 'privateKey' in options && options.privateKey
  const mnemonicPhrase = options && 'mnemonicPhrase' in options && options.mnemonicPhrase
  const json = options && 'json' in options && options.json
  const password = options && 'password' in options && options.password

  const privateKeySigner = privateKey && provider && new Wallet(privateKey, provider)
  const mnemonicPhraseSigner =
    mnemonicPhrase && provider && Wallet.fromPhrase(mnemonicPhrase).connect(provider)
  const encryptedJsonSigner =
    json && password && provider && Wallet.fromEncryptedJsonSync(json, password).connect(provider)

  const optionsSigner = options && 'signer' in options && options.signer

  return (
    privateKeySigner ||
    mnemonicPhraseSigner ||
    encryptedJsonSigner ||
    optionsSigner ||
    (library && 'getSigner' in library ? library.getSigner() : undefined)
  )
}
