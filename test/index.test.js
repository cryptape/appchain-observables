const {
  default: AppChainObservables
} = require('../lib')

const SERVER = 'https://node.cryptape.com'
const INTERVAL = 10
const RESERVED_RECORDS = 10

const appchainObservables = new AppChainObservables({
  server: SERVER,
  interval: INTERVAL,
  reservedRecords: RESERVED_RECORDS,
})

test('request peer count', () => {
  appchainObservables.peerCount(INTERVAL).subscribe(count => {
    expect(count.startsWith('0x')).toBeTruthy()
  })
})

test('request new block number', () => {
  appchainObservables.newBlockNumber(INTERVAL).subscribe(blockNumber => {
    expect.assertions(1)
    expect(blockNumber.startsWith('0x')).toBeTruthy()
  })
})

test('request block by number of earliest', () => {
  appchainObservables.newBlockNumber(INTERVAL).subscribe(blockNumber => {
    appchainObservables.blockByNumber(blockNumber).subscribe(block => {
      expect.assertions(1)
      expect(block.header.number).toBe(blockNumber)
    })
  })
})

test('request block by number of latest', () => {
  appchainObservables.blockByNumber('latest').subscribe(block => {
    expect.assertions(1)
    expect(block.header.number.startsWith('0x')).toBeTruthy()
  })
})

test('request block by number of hash', () => {
  appchainObservables.newBlockNumber(INTERVAL).subscribe(blockNumber => {
    appchainObservables.blockByNumber(blockNumber).subscribe(block => {
      expect.assertions(1)
      expect(block.header.number).toBe(blockNumber)
    })
  })
})

test('request block by number of integer', () => {
  appchainObservables.newBlockNumber(INTERVAL).subscribe(blockNumber => {
    appchainObservables.blockByNumber(+blockNumber).subscribe(block => {
      expect.assertions(1)
      expect(block.header.number).toBe(blockNumber)
    })
  })
})

test('request new block by number', () => {
  appchainObservables.newBlockByNumber(INTERVAL).subscribe(block => {
    expect.assertions(1)
    expect(block.startsWith('0x')).toBeTruthy()
  })
})

test('request block by hash', () => {
  const HASH =
    '0xa4fa53748ccb4c2009e1655772622f89cceea55d1bd1fb7cc49fc5fb41567c4d'
  appchainObservables.blockByHash(HASH).subscribe(block => {
    expect.assertions(1)
    expect(block.hash).toBe(HASH)
  })
})

test('get meta data', () => {
  appchainObservables
    .metaData({
      blockNumber: '0x0',
    })
    .subscribe(metaData => {
      expect.assertions(1)
      expect(+metaData.chainId).toBe(1)
    })
})

test.skip("get balance of ${'0x627306090abaB3A6e1400e9345bC60c78a8BEf57'}", (done) => {
  appchainObservables
    .getBalance({
      addr: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    })
    .subscribe(balance => {
      expect(balance.startsWith('0x')).toBeTruthy()
      done()
    })
})


test.skip("get quota price", (done) => {
  appchainObservables.getQuotaPrice('latest').subscribe(price => {
    expect(+price).toEqual(1000000000)
    done()
  })
})

//TODO: sendTransaction
// TODO: rest observables

// test('request block history', () => {
//TODO:
// })
