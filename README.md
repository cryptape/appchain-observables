![Travis](https://travis-ci.org/cryptape/nervos-observables.svg?branch=develop)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/@nervos/observables)
[![MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/cryptape/nervos-observables)
[![AppChain](https://img.shields.io/badge/made%20for-Nervos%20AppChain-blue.svg)](https://appchain.nervos.org/)

# Nervos-Observables

Observable based [CITA RPC](https://cryptape.github.io/cita/usage-guide/rpc/) toolkit

# Features

- Supports Observable API

# Installing

```bash
$ yarn add @nervos/observables
```

# Example

```javascript
import NervosObservables from 'nervos-observables'

const SERVER = 'localhost:1337'
const INTERVAL = 10
const RESERVED_RECORDS = 10

const nervosObservables = new NervosObservables({
  server: SERVER,
  interval: INTERVAL,
  reservedRecords: RESERVED_RECORDS,
})

/**
 * @function peerCount
 * @description subscribe to the count of peer
 * @param {string} interval - interval of observable
 * @param {boolean} observed - switch of observable, default to true, observing the peerCount
 * @return {string} count - peer count
 */
nervosObservables.peerCount(INTERVAL).subscribe(count => {
  console.log(count)
})

/**
 * @function newBlockNumber
 * @description subscribe to the latest block number
 * @param {string} interval - interval of observable
 * @param {boolean} observed - switch of observable, default to true, observing the new block number
 * @return {string} blockNumber - block number
 */
nervosObservables.newBlockNumber(INTERVAL).subscribe(blockNumber => {
  console.log(blockNumber)
})

/**
 * @function blockByNumber
 * @description request block by block number
 * @param {string} blockNumber
 * @return {object} block
 */
nervosObservables.blockByNumber(blockNumber).subscribe(block => {
  console.log(block)
})

/**
 * @function newBlockByNumber
 * @description subscribe to lastest block
 * @param {string} interval - interval of observable
 * @param {boolean} observed - switch of observable, default to true, observing the new block
 * @return {object} block
 */
nervosObservables.newBlockByNumber(INTERVAL).subscribe(block => {
  console.log(block)
})

/**
 * @function blockByHash
 * @description request block by block hash
 * @param {string} hash - block hash
 * @return {object} block
 */
nervosObservables.blockByHash(HASH).subscribe(block => {
  console.log(block)
})

/**
 * @function sendSignedTransaction
 * @description send signed transaction
 * @param {string} signedTransaction - signed transaction
 * @return {object} result
 */
nervosObservables.sendSignedTransaction(signedTransaction).subscribe(result => {
  console.log(result)
})

/**
 * @function newBlockByNumberSubject
 * @description subscribe to new block
 */
nervosObservable.newBlockByNumberSubject.subscribe(console.log)
nervosObservable.newBlockByNumberSubject.connect()
```
