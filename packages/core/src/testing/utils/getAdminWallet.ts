import { GanacheProvider } from "@ethers-ext/provider-ganache";

export async function getAdminWallet(provider: GanacheProvider) {
  return (await provider.listAccounts())[9]
}
