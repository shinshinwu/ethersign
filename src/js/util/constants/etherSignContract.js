define(function() {
  const contract = {
    address: '0x0249e50e1b83cae3bb3f16604c7de4cecc260886',
    ABI: [
      {
        "constant": false,
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "paused",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_signer",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_delegate",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_string",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "time",
            "type": "uint64"
          }
        ],
        "name": "DocumentSigned",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_signer",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_delegate",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "time",
            "type": "uint64"
          }
        ],
        "name": "Authorized",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_signer",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_delegate",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "time",
            "type": "uint64"
          }
        ],
        "name": "Deauthorized",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Pause",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Unpause",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_input",
            "type": "string"
          },
          {
            "name": "_signer",
            "type": "address"
          }
        ],
        "name": "signDocument",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_delegate",
            "type": "address"
          }
        ],
        "name": "authorize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "deauthorize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_signer",
            "type": "address"
          }
        ],
        "name": "getDelegate",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_signer",
            "type": "address"
          },
          {
            "name": "_delegate",
            "type": "address"
          }
        ],
        "name": "isDelegate",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]
  }

  return contract
})