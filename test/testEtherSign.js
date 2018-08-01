var EtherSign = artifacts.require("EtherSign")

contract('EtherSign', async (accounts) => {

  // @notice When a document is signed, it is important that all the params fired from the event is correct as later on that is how we will be able to retrieve the document in its entirety.
  // Also when the signer personally signed the document him/herself, the delegate should be marked as the zero address.
  it("should fire documentSigned event properly", async () => {
    var etherSignInstance = await EtherSign.deployed();
    var signer = accounts[1];

    let result = await etherSignInstance.signDocument('a doc', 'ABc12', signer, {from: signer});

    let event = result.logs[0]

    assert.equal(event.event, 'DocumentSigned');
    assert.equal(event.args.title, 'a doc');
    assert.equal(event.args.content, 'ABc12');
    assert.equal(event.args.signer, signer);
    assert.equal(event.args.delegate, "0x0000000000000000000000000000000000000000");
    assert.equal(event.args.documentId.toNumber(), 1);
  })

  // @notice It is important that an address can assign a delegate to sign document on ones behalf such as power of attorny
  it("should be able to authorize a delegate", async () => {
    var etherSignInstance = await EtherSign.deployed();
    var signer = accounts[0];
    var delegate = accounts[1];

    await etherSignInstance.authorize(delegate, {from: signer});

    let retrievedDelegate = await etherSignInstance.getDelegate.call(signer)

    assert.equal(retrievedDelegate, delegate);
  })

  // @notice When an authorized delegate sign a document, it should list the document signed by the intended signer and the list the acting delegate appropriately
  it("should be able to let an authorized delegate sign document on signer's behalf", async () => {
    let etherSignInstance = await EtherSign.deployed();
    let signer = accounts[1];
    let delegate = accounts[2];

    await etherSignInstance.authorize(delegate, {from: signer});

    let result = await etherSignInstance.signDocument('another doc', 'ABc12', signer, {from: delegate});

    let event = result.logs[0]

    assert.equal(event.event, 'DocumentSigned');
    assert.equal(event.args.title, 'another doc');
    assert.equal(event.args.content, 'ABc12');
    assert.equal(event.args.signer, signer);
    assert.equal(event.args.delegate, delegate);
  })

  // @notice It is important that one cannot pretend to be someone else and sign document on their behalf if they are not authorized. This is an important security feature.
  it("should fail to sign a document for someone else that one is not authorized for", async () => {
    let etherSignInstance = await EtherSign.deployed();
    let signer = accounts[2];
    let unauthorizedAddress = accounts[3];

    try {
      await etherSignInstance.signDocument('binding contract', 'Gimmemoney', signer, {from: unauthorizedAddress});
    } catch(err) {
      assert.include(
        err.message,
        'VM Exception',
        'operation should fail with VM exception'
      );
    }
  })

  // @notice When multiple users need to sign the same document (such as the US declaration of independence, to avoid user creating the same document multiple times, they should be able to simply add their signature for an existing doc.
  it("should be able to add signer to an existing doc", async () => {
    let etherSignInstance = await EtherSign.deployed();
    let signer1 = accounts[3];
    let signer2 = accounts[4];

    await etherSignInstance.signDocument('first doc', 'ABc12', signer1, {from: signer1});

    let result = await etherSignInstance.addSigner(1, signer2, {from: signer2});

    let event = result.logs[0]

    assert.equal(event.event, 'SignerAdded');
    assert.equal(event.args.signer, signer2);
    assert.equal(event.args.documentId.toNumber(), 1);
  })

  // @notice An authorized delegate should be able to add signature to existing document on their signer's behalf.
  it("should be able to add signature as authorized delegate", async () => {
    let etherSignInstance = await EtherSign.deployed();
    let signer1 = accounts[4];
    let signer2 = accounts[5];
    let delegate = accounts[6];

    await etherSignInstance.signDocument('first doc', 'ABc12', signer1, {from: signer1});

    await etherSignInstance.authorize(delegate, {from: signer2});

    let result = await etherSignInstance.addSigner(1, signer2, {from: delegate});

    let event = result.logs[0]

    assert.equal(event.event, 'SignerAdded');
    assert.equal(event.args.signer, signer2);
    assert.equal(event.args.documentId.toNumber(), 1);
  })

  // @notice When the emergency stop is activated and the contract is paused (due to bugs or general upgrade), the signing feature should no longer work at this contract
  it("should fail to sign document when contract is paused", async () => {
    let etherSignInstance = await EtherSign.deployed();
    let signer = accounts[0];

    await etherSignInstance.pause()

    try {
      await etherSignInstance.signDocument('buggy contract', 'Meowiinngg', signer, {from: signer});
    } catch(err) {
      assert.include(
        err.message,
        'VM Exception',
        'operation should fail with VM exception'
      );
    }
  })
})