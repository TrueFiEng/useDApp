import 'jsdom-global/register'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import chaiAsPromised from 'chai-as-promised'

chai.use(solidity)
chai.use(chaiAsPromised)
