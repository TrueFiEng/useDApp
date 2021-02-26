Performant idiomatic React
######


Guides
######

Reading from blockchain
***********************

When using hooks based on useChainCall there are important considerations;

Avoid using the result of one hook in another
=========================================

Avoid using the result of one hook in another.
This will break single multicall into multiple multicalls. 
It will reduce performance, generate delays, and flickering for the user.
Instead, try to retrieve needed information in a single call or multiple parallel calls.
That might need to modify smart contracts.
If that is too complex consider using a custom backend or The Graph.

Custom hooks
************

Tesing hooks
************


Web3Dialog
**********


Multiple chains
***************


Error handling
**************
