var Pausable = artifacts.require("zeppelin/contracts/lifecycle/Pausable.sol");
var EtherSign = artifacts.require("EtherSign");

module.exports = function(deployer) {
  deployer.deploy(Pausable, {overwrite: false}).then(function() {
    return deployer.deploy(EtherSign, Pausable.address);
  });
};