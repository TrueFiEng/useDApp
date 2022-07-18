import {MockProvider} from 'ethereum-waffle';
import { mineBlock, sleep } from '../testing';

describe.skip('MockProvider', () => {
  it('askjvcna', async () => {
    const provider = new MockProvider()
    provider.on('block', (payload: any) => { console.log({ payload }) })
    provider.pollingInterval = 100

    await mineBlock(provider);
    await sleep(1000);
    await mineBlock(provider);
    await sleep(5000);
  }).timeout(10000)
})