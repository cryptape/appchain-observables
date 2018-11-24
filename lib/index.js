"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
const plugin_1 = __importStar(require("@appchain/plugin"));
class AppChainObservables {
    constructor({ server, interval = 1000, reservedRecords = 10, }) {
        this.setServer = (server) => {
            this.server = server;
            const Web3Ins = plugin_1.default({ server });
            this.appchainWeb3 = Web3Ins.appchain;
        };
        this.newBlockNumber = (interval = this.interval, observed = true) => observed
            ? rxjs_1.Observable.interval(interval)
                .startWith(0)
                .switchMap(() => this.appchainWeb3.getBlockNumber())
                .distinct()
            : rxjs_1.Observable.fromPromise(this.appchainWeb3.getBlockNumber());
        this.blockByNumber = (blockNumber) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getBlockByNumber({
            quantity: blockNumber,
            txInfo: plugin_1.BlockTransactionInfo.Detail,
        }));
        this.blockByHash = (blockHash) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getBlockByHash({
            hash: blockHash,
            txInfo: plugin_1.BlockTransactionInfo.Detail,
        }));
        this.newBlockByNumber = (interval = this.interval, observed = true) => this.newBlockNumber(interval, observed).switchMap(blockNumber => {
            if (typeof blockNumber === 'string' || typeof blockNumber === 'number') {
                return this.blockByNumber(blockNumber);
            }
            return rxjs_1.Observable.of({
                code: -1,
                message: 'Invalid BlockNumber',
            });
        });
        this.peerCount = (interval = this.interval, observed = true) => observed
            ? rxjs_1.Observable.interval(interval)
                .startWith(0)
                .switchMap(() => this.appchainWeb3.netPeerCount())
            : rxjs_1.Observable.fromPromise(this.appchainWeb3.netPeerCount());
        this.sendSignedTransaction = signedData => rxjs_1.Observable.fromPromise(this.appchainWeb3.sendSignedTransaction(signedData));
        this.blockHistory = (params) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getBlockHistory(params));
        this.getLogs = ({ topics = [], fromBlock = '0x0', }) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getLogs({
            topics,
            fromBlock,
        }));
        this.ethCall = (params) => rxjs_1.Observable.fromPromise(this.appchainWeb3.ethCall(params));
        this.getTransaction = (hash) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getTransaction(hash));
        this.getTransactionReceipt = (hash) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getTransactionReceipt(hash));
        this.getTransactionCount = (params) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getTransactionCount(params));
        this.getCode = (params) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getCode(params));
        this.getAbi = (params) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getAbi({
            addr: params.contractAddr,
            blockNumber: params.blockNumber,
        }));
        this.getTransactionProof = (hash) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getTransactionProof(hash));
        this.metaData = ({ blockNumber = 'latest' }) => rxjs_1.Observable.fromPromise(this.appchainWeb3.metadata({ blockNumber: blockNumber }));
        this.getBalance = ({ addr, blockNumber = 'latest', }) => rxjs_1.Observable.fromPromise(this.appchainWeb3.getBalance({ addr, quantity: blockNumber }));
        this.getQuotaPrice = (blockNumber = 'latest') => rxjs_1.Observable.fromPromise(this.appchainWeb3.getQuotaPrice(blockNumber));
        this.interval = interval;
        this.setServer(server);
        const newBlockByNumberSubject = new rxjs_1.ReplaySubject(reservedRecords);
        this.newBlockByNumberSubject = this.newBlockByNumber(interval || this.interval).multicast(newBlockByNumberSubject);
    }
}
exports.default = AppChainObservables;
