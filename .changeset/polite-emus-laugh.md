---
"@usedapp/core": patch
---

Add troubleshooting ethers type mismatch to docs

Type mismatch when building might be an error in ethersproject version providing becouse of this 
ading resolutions to package.json should fix problem

"resolutions": {
    "@ethersproject/abi": "5.2.0",
    "@ethersproject/contracts": "5.2.0"
  }
