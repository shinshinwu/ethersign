pragma solidity 0.4.24;

import "zeppelin/contracts/lifecycle/Pausable.sol";

/**
 * @title EtherSign - document signing affordably on the Ethereum blockchain!

 * @notice
   This contract opt for storing document through firing of events as a (much) cheaper alternative than storing the document in storage since string storage on Ethereum blockchain is extremely expensive.
   For more detailed design pattern explaination, please refer to design_pattern_desicions.md

 * @dev the contract can be paused by owner in case of catastrophic bugs. Contract can be then upgraded and frontend can adopt the new address. The contract has been kept intentionally simple and straightforward to avoid potential attacks.
*/

contract EtherSign is Pausable {
  /*** EVENTS ***/

  // @dev Again we don't store much outside of what is light and absolute neccessary in storage due to cost. Most data we try to manage via event firing

  // @dev Document related events. All events are kept intentionally similar orders as when searching for events we utilize topics and argument order matters.
  event DocumentSigned(address indexed signer, address indexed delegate, uint indexed documentId, string title, string content, uint64 time);
  event SignerAdded(address indexed signer, address indexed delegate, uint indexed documentId, uint64 time);

  // @dev Signing authority related events
  event Authorized(address indexed signer, address indexed delegate, uint64 time);
  event Deauthorized(address indexed signer, address indexed delegate, uint64 time);

  // @dev A straightforward mappin to keep track of authorized signers
  mapping (address => address) authorizedDelegates;

  // @dev We keep an internal document counter which is basically the document ID per se on the blockchain. This way we can later retrieve the doc by searching for the event with the id
  uint public documentCounter;

  /** @dev Mark a document signed by an address by firing approriate event.
    * @param _title The title of the document.
    * @param _content A LZMA compressed base64 string that can be decompressed to a fully styled document.
    * @param _signer Address of the person (or any capable intelligent being - AI, the matrix etc) who is signing the document.
  */
  function signDocument(string _title, string _content, address _signer) external whenNotPaused {
    address delegate = authorizedDelegates[_signer];

    // only the sender or an authorized delegate can sign on the sender behalf
    require((msg.sender == _signer) || (msg.sender == delegate));

    // we will increment the document counter so it can act as an unique ID for the document that we can use later to retrieve document.
    documentCounter ++;

    // if the signer is acting on his/her own behalf, set the delegate to address 0
    // if an authorized delegate is acting on the signer's behalf, mark it so on the event so we can distinguish who initiated the signing.
    if (msg.sender == _signer) {
      emit DocumentSigned(msg.sender, address(0), documentCounter, _title, _content, uint64(now));
    } else if (msg.sender == delegate) {
      emit DocumentSigned(_signer, delegate, documentCounter, _title, _content, uint64(now));
    }
  }

  /** @dev Add additional signatures to an existing document.
    * @notice When multiple users need to sign the same document (such as the US declaration of independence, to avoid user creating the same document multiple times, they should be able to simply add their signature for an existing doc.
    * @param _documentId The documentId assigned when the document was signed for the first time.
    * @param _signer Address of the person who is signing the document.
  */
  function addSigner(uint _documentId, address _signer) external whenNotPaused {
    // contract need to exist
    require(_documentId <= documentCounter);
    address delegate = authorizedDelegates[_signer];
    // only the sender or an authorized delegate can sign on the sender behalf
    require((msg.sender == _signer) || (msg.sender == delegate));

    // if the signer is acting on his/her own behalf, set the delegate to address 0
    // if an authorized delegate is acting on the signer's behalf, mark it so on the event so we can distinguish who initiated the signing.
    if (msg.sender == _signer) {
      emit SignerAdded(msg.sender, address(0), _documentId, uint64(now));
    } else if (msg.sender == delegate) {
      emit SignerAdded(_signer, delegate, _documentId, uint64(now));
    }
  }

  /** @dev We allow an account to authorize 1 other account to sign document on their behalf. Think of it like Power of Attorney etc.
    * @param _delegate The address of the account that you authorize full signing power for you.
  */
  function authorize(address _delegate) external whenNotPaused {
    // You cannot set yourself, address 0 or existing delegate as your delegate, no need to waste gas on that.
    require(_delegate != msg.sender);
    require(_delegate != address(0));
    address lastDelegate = authorizedDelegates[msg.sender];
    require(_delegate != lastDelegate);

    if (lastDelegate != _delegate) {
      authorizedDelegates[msg.sender] = _delegate;

      // We need to fire events approriatly for real accounts (not for address 0) since we use events to track all the signers a delegate is responsible for.
      if (lastDelegate != address(0)) {
        emit Deauthorized(msg.sender, lastDelegate, uint64(now));
      }

      emit Authorized(msg.sender, _delegate, uint64(now));
    }
  }

  /** @dev Remove a previous delegate one have previous assigned. Note here we allow this method to be fired even when the contract is not paused as users should be able to retract in all circumstances.
  */
  function deauthorize() external {
    if (authorizedDelegates[msg.sender] != address(0)) {
      address delegate = authorizedDelegates[msg.sender];
      delete authorizedDelegates[msg.sender];
      emit Deauthorized(msg.sender, delegate, uint64(now));
    }
  }

  /** @dev Look up delegate who has signing power for a known address.
    * @param _signer The signer address we want to look up for.
    * @return address The signing delegate for the inquired address.
  */
  function getDelegate(address _signer) external view returns (address) {
    return authorizedDelegates[_signer];
  }

  /** @dev Check if an address has signing power for an address. Another convinience method to check signing power.
    * @param _signer The signer address we want to look up for.
    * @param _delegate The delegate address we want to look up for.
    * @return boolean Whether or not the inquired delegate address has signing power for the signer address.
  */
  function isDelegate(address _signer, address _delegate) external view returns (bool) {
    address delegate = authorizedDelegates[_signer];

    // We do not consider address 0 as delegate for anyone as that is the default value and theoretically no one should have access to address 0 account.
    if (delegate == address(0)) {
      return false;
    } else {
      return (delegate == _delegate);
    }
  }
}
