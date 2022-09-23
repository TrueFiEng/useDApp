export const MATCHERS_SOURCE = `
  pragma solidity ^0.8.0;

  contract Matchers {
    uint counter;

    function doNothing() public pure {

    }

    function doModify() public {
      counter += 1;
    }

    function doThrow() public pure {
      assert(false);
    }

    function doRevert() public pure {
      revert("Revert cause");
    }

    function doPanic() public pure {
      uint d = 0;
      uint x = 1 / d;
    }

    function doRevertWithComplexReason() public pure {
      revert("Revert cause (with complex reason)");
    }

    function doRequireFail() public pure {
      require(false, "Require cause");
    }

    function doRequireSuccess() public pure {
      require(true, "Never to be seen");
    }

    function doThrowAndModify() public {
      counter += 1;
      assert(false);
    }

    function doRevertAndModify() public {
      counter += 1;
      revert("Revert cause");
    }

    function doRequireFailAndModify() public {
      counter += 1;
      require(false, "Require cause");
    }

    function getTuple() external view returns (address, uint96) {
      return (0xb319771f2dB6113a745bCDEEa63ec939Bf726207, 9771);
    }

    function requireFalseWithSingleQuote() external view {
      require(false, "asset doesn't have feed");
    }
  }
`

export const matchersContractABI = {
  contractName: 'Matchers',
  abi: [
    {
      inputs: [],
      name: 'doModify',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doNothing',
      outputs: [],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doPanic',
      outputs: [],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doRequireFail',
      outputs: [],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doRequireFailAndModify',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doRequireSuccess',
      outputs: [],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doRevert',
      outputs: [],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doRevertAndModify',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doRevertWithComplexReason',
      outputs: [],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doThrow',
      outputs: [],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'doThrowAndModify',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTuple',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint96',
          name: '',
          type: 'uint96',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'requireFalseWithSingleQuote',
      outputs: [],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  // eslint-disable-next-line max-len
  bytecode:
    '608060405234801561001057600080fd5b50610823806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063afc874d21161008c578063d51033db11610066578063d51033db1461012e578063d64ee4531461014d578063eacf8a5714610157578063fff78f9c14610161576100cf565b8063afc874d214610110578063b217ca111461011a578063be3e2e6014610124576100cf565b806301236db4146100d45780632f576f20146100de578063841caf38146100e85780639817185d146100f2578063a6f34dcb146100fc578063af9b573914610106575b600080fd5b6100dc61016b565b005b6100e66101bf565b005b6100f06101c1565b005b6100fa6101eb565b005b610104610201565b005b61010e61025d565b005b610118610298565b005b6101226102d3565b005b61012c6102ee565b005b610136610331565b6040516101449291906104b8565b60405180910390f35b610155610354565b005b61015f610397565b005b6101696103da565b005b600160008082825461017d9190610592565b925050819055506040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101b6906104e1565b60405180910390fd5b565b60016000808282546101d39190610592565b9250508190555060006101e9576101e861066d565b5b565b6000808160016101fb91906105e8565b90505050565b60016000808282546102139190610592565b92505081905550600061025b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161025290610501565b60405180910390fd5b565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161028f90610541565b60405180910390fd5b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102ca906104e1565b60405180910390fd5b60016000808282546102e59190610592565b92505081905550565b600161032f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032690610561565b60405180910390fd5b565b60008073b319771f2db6113a745bcdeea63ec939bf72620761262b915091509091565b6000610395576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038c90610521565b60405180910390fd5b565b60006103d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103cf90610501565b60405180910390fd5b565b60006103e9576103e861066d565b5b565b6103f481610619565b82525050565b6000610407600c83610581565b9150610412826106fa565b602082019050919050565b600061042a600d83610581565b915061043582610723565b602082019050919050565b600061044d601783610581565b91506104588261074c565b602082019050919050565b6000610470602283610581565b915061047b82610775565b604082019050919050565b6000610493601083610581565b915061049e826107c4565b602082019050919050565b6104b281610655565b82525050565b60006040820190506104cd60008301856103eb565b6104da60208301846104a9565b9392505050565b600060208201905081810360008301526104fa816103fa565b9050919050565b6000602082019050818103600083015261051a8161041d565b9050919050565b6000602082019050818103600083015261053a81610440565b9050919050565b6000602082019050818103600083015261055a81610463565b9050919050565b6000602082019050818103600083015261057a81610486565b9050919050565b600082825260208201905092915050565b600061059d8261064b565b91506105a88361064b565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156105dd576105dc61069c565b5b828201905092915050565b60006105f38261064b565b91506105fe8361064b565b92508261060e5761060d6106cb565b5b828204905092915050565b60006106248261062b565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006bffffffffffffffffffffffff82169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f5265766572742063617573650000000000000000000000000000000000000000600082015250565b7f5265717569726520636175736500000000000000000000000000000000000000600082015250565b7f617373657420646f65736e277420686176652066656564000000000000000000600082015250565b7f52657665727420636175736520287769746820636f6d706c657820726561736f60008201527f6e29000000000000000000000000000000000000000000000000000000000000602082015250565b7f4e6576657220746f206265207365656e0000000000000000000000000000000060008201525056fea2646970667358221220211ac0b27eb7e77bdda6b606a94c0f573d58fba3257013d527dd369eb984c62a64736f6c63430008070033',
}
