// constants
import {NETWORKS} from './constants/networks'
// web3 utils
import getWeb3 from './getWeb3'
import pollWeb3 from './pollWeb3'
// contract related utils
import getContract from './getContract'
import getDelegate from './contracts/getDelegate'
import setDelegate from './contracts/setDelegate'
import removeDelegate from './contracts/removeDelegate'
import signDocument from './contracts/signDocument'
import getUserEvents from './contracts/getUserEvents'
import getDocument from './contracts/getDocument'
import addSigner from './contracts/addSigner'
import getAdditionalSigners from './contracts/getAdditionalSigners'

export {
  getWeb3,
  pollWeb3,
  getContract,
  getDelegate,
  setDelegate,
  removeDelegate,
  signDocument,
  getUserEvents,
  getDocument,
  addSigner,
  getAdditionalSigners,
  NETWORKS
}