# How EtherSign Avoid Common Attacks

- **Check essential requirement first and fail loud**

All require statements are checked before implementing any storage change. Transactions that do not meet requirements will be reverted.

- **Emergency Stop**

In case of a critical bug, the contract owner can set the contract to be paused and update the front end up to operate on an upgraded and bug-fixed contract. Historically signed documents can still be retrieved via events.

- **Simple Design**

The EtherSign contract was designed with intentional simplicity so the code can be easily interpreted, which makes it easy to identify bugs.

- **Avoid Ether Handling**

EtherSign does not have any payable methods thus there are no direct monetary gains from attacking the contract. All monetary transactions stemmed from the signing of documents should be executed from other external contracts by listening to the appropriate EtherSign events.