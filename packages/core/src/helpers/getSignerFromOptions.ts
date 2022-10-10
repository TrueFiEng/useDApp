import { ethers, providers } from 'ethers'
import { TransactionOptions } from '../model'

type BaseProvider = providers.BaseProvider
type JsonRpcProvider = providers.JsonRpcProvider
type FallbackProvider = providers.FallbackProvider

export const getSignerFromOptions = (
  provider: BaseProvider,
  options?: TransactionOptions,
  library?: JsonRpcProvider | FallbackProvider
) => {
  const privateKey = options && 'privateKey' in options && options.privateKey
  const mnemonicPhrase = options && 'mnemonicPhrase' in options && options.mnemonicPhrase
  const json = options && 'json' in options && options.json
  const password = options && 'password' in options && options.password

  const privateKeySigner = privateKey && provider && new ethers.Wallet(privateKey, provider)
  const mnemonicPhraseSigner =
    mnemonicPhrase && provider && ethers.Wallet.fromMnemonic(mnemonicPhrase).connect(provider)
  const encryptedJsonSigner =
    json && password && provider && ethers.Wallet.fromEncryptedJsonSync(json, password).connect(provider)

  const optionsSigner = options && 'signer' in options && options.signer

  return (
    privateKeySigner ||
    mnemonicPhraseSigner ||
    encryptedJsonSigner ||
    optionsSigner ||
    (library && 'getSigner' in library ? library.getSigner() : undefined)
  )
}
