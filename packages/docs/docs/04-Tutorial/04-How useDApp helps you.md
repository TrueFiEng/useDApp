# How useDApp helps you

useDApp supports all of the [requirements](./DApp%20Requirements) of a well functioning DApp - in a moment we will find out how we can use that power to your advantage.

- useDapp ensures the DApp is **up-to-date** - It automatically refreshes state of the blockchain as soon as new blocks are mined.

:::info
You can use `pollingInterval` in useDApp Config in order to fine-tune the refresh frequency of new blocks.
:::

- useDApp ensures the DApp **has consistent state** - All the data displayed comes from a single block, ensuring there is no inconsistencies or conflicting data displayed to the end user.

- useDApp helps make a DApp **efficient**, by utilizing the [Multicall](../02-Guides/02-Reading/05-Multicall.md) contract to limit requests to API providers. Additionally, the data is fetched only if it is required in the visible (rendered) part of the UI.

:::info
During local development with a local blockchain node (such as Hardhat or Ganache), useDApp can automatically deploy a [Multicall](./Multicall) contract to ease and speed up development.
:::

---

Enough theory? 👉 Let's head on to [practice](./Setup).
