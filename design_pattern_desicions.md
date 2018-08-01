# EtherSign Design Decisions

## Project Motivations

Secure document storage and signing are essential issues to solve for modern day business transactions and we have seen companies such as DocuSign and HelloSign trying to tackle these issues with traditional web app structures.

However, secure information storage and user authentications are some of the top benefits the blockchain technology can provide. Shocked to see that there is currently no adequate implementation of secure document signing on the blockchain, an idea was born to build it for the Ethereum blockchain.

## Implementations

There are a few main concerns when it comes to secure document signing on the Ethereum blockchain:

- **Cost.**

To store large document such as string can be prohibitively expensive on the Ethereum blockchain at the current state. Currently, [it cost 20k gas](https://ethereum.stackexchange.com/questions/872/what-is-the-cost-to-store-1kb-10kb-100kb-worth-of-data-into-the-ethereum-block) to just store a 256 bit word - which is astronomically more expensive than other traditional web storage options.
> To combat potential high cost, EtherSign pioneered a new and extremely cost-efficient way of storing a content heavy document by first compress the document using the Lempel–Ziv–Markov chain algorithm (**[LZMA](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm)**) which provides highly efficient lossless data compression. Then instead of storing the compressed string in EVM storage which is very costly, EtherSign opt for storing documents in events with appropriately indexed params.
- **Multiple Signatures**

Often times the same document needs to be signed by multiple parties to be validated.
> EtherSign implements a feature to allow additional signers to add their signature to an existing document by using a document ID system. This avoids storing multiple duplicates of the same document and thus increased costs.
- **Document Styling**

Often times we wish to create and store documents with styling that can enhance the reading experience, rather than just reading a blob of string.
> EtherSign implements traditional markdown stylings and stores the compressed strings accordingly. How the document was created will be how the document is viewed.
- **Signing Flexibility**

In real world we often can delegate our signing power to another person in certain situations such as *Power of Attorney*.
> EtherSign allows one to designate another individual to sign documents on their behalf. That authorization can be revoked by the user at any time. Any document signed by an authorized delegate on the original signer's behalf will be marked so accordingly.
- **Emergency Stop and Upgradability**

In case of catastrophic failure and bugs on the contract, the contract should be able to be stopped and upgraded.
> EtherSign implements emergency stop pattern that allows the contract to be paused and upgraded in events of failure.

## Future Improvements
- **Only allow certain user to view document.**

This feature could be desirable as some document may contain sensitive personal information one does not wish to reveal. However, currently this is impossible due to the public and transparent nature of solidity events.
- **Only allow certain user to sign document.**

This could be implemented by allowing document creator to assign a set number of addresses to add their signature to a certain document. However, this will increase the cost of document signing and currently we are not certain the demand for such feature.
- **Richer interface implementation**

Markdown interface is a great way of simple styling but there could be document that requires much more rich interface. This can potentially be achieved by allowing user to create document with HTML. However, this can lead to potential javascript injections so security is a concern.