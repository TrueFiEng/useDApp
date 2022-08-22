export const GNOSIS_SAFE_ABI = [
  'event SignMsg(bytes32 indexed msgHash)',
  'function getMessageHash(bytes memory message) public view returns (bytes32)',
  'function signedMessages(bytes32 msgHash) public view returns (uint256)',
  'function isValidSignature(bytes calldata _data, bytes calldata _signature) public view returns (bytes4)',
]
