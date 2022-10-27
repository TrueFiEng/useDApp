# DApp Requirements

We've learned what a DApp is, but let's follow through by defining some universal characteristics of a well functioning DApp.

A good DApp should:

- **Be up-to-date** - It should automatically refresh state for each new block (~ every 15 seconds)
- **Have consistent state** - The state we display should be consistently taken from a single block - we should not present information taken from different blocks, in order to avoid inconsistencies or conflicting data
- **Be efficient** - We should not spam the blockchain API provider. Not only would that spike up our bill, but also slow down the app for the user.

Sounds like work? Not necessarily - [useDApp does it all](./useDapp%20does%20it%20all) - automatically!
