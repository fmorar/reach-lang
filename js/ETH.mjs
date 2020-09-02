import Timeout         from 'await-timeout';
import ethers          from 'ethers';
import * as http       from 'http';
import * as url        from 'url';
import * as waitPort   from 'wait-port';

import { getConnectorMode }  from './loader.mjs';
import {
  getDEBUG, debug, bigNumberify, isBigNumber, assert,
} from './shared.mjs';
export * from './shared.mjs';

// Note: if you want your programs to exit fail
// on unhandled promise rejection, use:
// node --unhandled-rejections=strict

// XXX: when using ganache: nvm use 12
// ganache-core doesn't work with npm version 14 yet
// https://github.com/trufflesuite/ganache-cli/issues/732#issuecomment-623782405

// networkAccount[ETH] = {
//   // Required for receivers
//   address: string
//
//   // Required for senders
//   sendTransaction: function
//
//   // Must be an ethers.Wallet to deploy or attach to a contract.
// }
//
// ctc[ETH] = {
//   address: string
//   creation_block: int
//
//   // internal fields
//   // * not required to call acc.attach(bin, ctc)
//   // * required by backend
//   sendrecv: function
//   recv: function
// }

// Unique helpers

export const toWei = (amt, unit) =>
  ethers.utils.parseUnits(amt, unit || 'ether');
export const fromWei = (amt, unit) =>
  ethers.utils.formatUnits(amt, unit || 'ether');
export const toWeiBigNumber = (a,b) => bigNumberify(toWei(a, b));

// end Unique helpers

// private helpers

const flaky = async (f) => {
  const max_tries = 3;
  const sleep_between_tries = 1000; // ms
  let failed_attempts = 0;
  while (true) {
    try {
      // await doHealthcheck();
      return await f();
    } catch (e) {
      failed_attempts++;
      if (failed_attempts >= max_tries) {
        throw e;
      } else {
        debug(`FAILED ATTEMPT # ${failed_attempts}...`);
        await Timeout.set(sleep_between_tries);
        debug('trying again...');
      }
    }
  }
};
void(flaky); // XXX

// end private helpers

// Common interface exports

const connectorMode = getConnectorMode();

const networkDesc = connectorMode == 'ETH-test-embedded-ganache' ? {
  type: 'embedded-ganache',
} : connectorMode == 'ETH-test-dockerized-geth' ? {
  type: 'uri',
  uri: process.env.ETH_NODE_URI || 'http://localhost:8545',
  network: process.env.ETH_NODE_NETWORK || 'unspecified',
} : {
  type: 'skip',
};

const portP = (async () => {
  if (networkDesc.type != 'uri') { return; }
  const { hostname, port, path } = url.parse(networkDesc.uri);
  const params = {
    protocol: 'http' // XXX no apparent need to support https
    , host: hostname
    , port: parseInt(port, 10)
    , path
    , 'output': 'silent'
    , 'timeout': 1000*60*1 };
  await waitPort.default(params);
})();

// XXX: doesn't even retry, just returns the first attempt
const doHealthcheck = async () => {
  if (networkDesc.type != 'uri') { return; }
  await new Promise((resolve, reject) => {
    const { hostname, port } = url.parse(networkDesc.uri);
    const data = JSON.stringify({
      jsonrpc: '2.0',
      method: 'web3_clientVersion',
      params: [],
      id: 67
    });
    debug('Sending health check request...');
    const opts = {
      hostname,
      port,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      }
    };
    const req = http.request(opts, (res) => {
      debug(`statusCode: ${res.statusCode}`);
      res.on('data', (d) => {
        debug('rpc health check succeeded');
        if (getDEBUG()) {
          process.stdout.write(d);
        }
        resolve({res, d});
      });
    });
    req.on('error', (e) => {
      console.log('rpc health check failed');
      console.log(e);
      reject(e);
    });
    req.write(data);
    debug('attached all the handlers...');
    req.end();
    debug('req.end...');
  });
};

const devnetP = (async () => {
  await portP;
  debug('Got portP, waiting for health');
  return await doHealthcheck();
})();

const etherspP = (async () => {
  if (networkDesc.type == 'uri') {
    await devnetP;
    const ethersp = new ethers.providers.JsonRpcProvider(networkDesc.uri);
    ethersp.pollingInterval = 500; // ms
    return ethersp;
  } else if (networkDesc.type == 'embedded-ganache') {
    const {default: ganache} = await import('ganache-core');
    const default_balance_ether = '999999999';
    const ganachep = ganache.provider({default_balance_ether});
    return new ethers.providers.Web3Provider(ganachep);
  } else {
    // This lib was imported, but not for its net connection.
    return null;
  }
})();

async function getEthersP() {
  const ethersp = await etherspP;
  if (ethersp === null) {
    throw Error(`Using stdlib/ETH is incompatible with REACH_CONNECTOR_MODE=${connectorMode}`);
  } else {
    return ethersp;
  }
}


// XXX expose setProvider

const ethersBlockOnceP = async () => {
  const ethersp = await getEthersP();
  return new Promise((resolve) => ethersp.once('block', (n) => resolve(n)));
};

export const balanceOf = async acc => {
  const { networkAccount } = acc;
  if (!networkAccount) throw Error(`acc.networkAccount missing. Got: ${acc}`);

  if (networkAccount.getBalance) {
    return bigNumberify(await acc.networkAccount.getBalance());
  } else if (networkAccount.address) {
    const ethersp = await getEthersP();
    return bigNumberify(await ethersp.getBalance(networkAccount.address));
  } else throw Error(`acc.networkAccount.address missing. Got: ${networkAccount}`);
};

// XXX dead code?
// `t` is a type name in string form; `v` is the value to cast
// const encode = (t, v) =>
//   ethers.utils.defaultAbiCoder.encode([t], [v]);

export const transfer = async (to, from, value) => {
  if (!to.address) throw Error(`Expected to.address: ${to}`);
  if (!from.sendTransaction) throw Error(`Expected from.sendTransaction: ${from}`);
  if (!isBigNumber(value)) throw Error(`Expected a BigNumber: ${value}`);

  const txn = { to: to.address, value };
  debug(`from.sendTransaction(${JSON.stringify(txn)})`);
  return await from.sendTransaction(txn);
};

// Helpers for sendrecv and recv

const rejectInvalidReceiptFor = async (txHash, r) =>
      new Promise((resolve, reject) =>
                  !r                             ? reject(`No receipt for txHash: ${txHash}`)
                  : r.transactionHash !== txHash ? reject(`Bad txHash; ${txHash} !== ${r.transactionHash}`)
                  : !r.status                    ? reject(`Transaction: ${txHash} was reverted by EVM\n${r}`)
                  : resolve(r));

const fetchAndRejectInvalidReceiptFor = async txHash => {
  const ethersp = await getEthersP();
  const r = await ethersp.getTransactionReceipt(txHash);
  return await rejectInvalidReceiptFor(txHash, r);
};

export const connectAccount = async networkAccount => {
  // XXX networkAccount MUST be a wallet to deploy/attach
  const ethersp = await getEthersP();
  const { address } = networkAccount;
  const shad = address.substring(2,6);

  const attach = async (bin, ctc) => {
    const ctc_address = ctc.address;
    const creation_block = ctc.creation_block;
    const ABI = JSON.parse(bin._Connectors.ETH.ABI);
    const ethersCtc = new ethers.Contract(ctc_address, ABI, networkAccount);
    const eventOnceP = (e) =>
          new Promise((resolve) => ethersCtc.once(e, (...a) => resolve(a)));

    debug(`${shad}: created at ${creation_block}`);
    let last_block = creation_block;

    const updateLast = o => { last_block = o.blockNumber; };

    const getEventData = (ok_evt, ok_e) => {
      const ok_args_abi = ethersCtc.interface.getEvent(ok_evt).inputs;
      const { args } = ethersCtc.interface.parseLog(ok_e);
      const [ ok_bal, ...ok_vals ] = ok_args_abi.map(a => args[a.name]);

      return [ ok_bal, ok_vals ];
    };

    const iam = (some_addr) => {
      if ( some_addr == address ) {
        return address;
      } else {
        throw Error(`I should be ${some_addr}, but am ${address}`);
      }
    };

    const wait = async (delta) => {
      const targetTime = last_block + delta;
      const waitP = waitUntilBlock(targetTime);
      // TODO: make users start a block ticker explicitly?
      if (isIsolatedNetwork) {
        fastForwardTo(targetTime);
      }
      await waitP;
    };

    const sendrecv_top = async (label, funcNum, evt_cnt, args, value, timeout_delay, try_p) => {
      void(try_p, evt_cnt);
      return sendrecv(label, funcNum, args, value, timeout_delay); };

    /* eslint require-atomic-updates: off */
    const sendrecv = async (label, funcNum, args, value, timeout_delay) => {
      const funcName = `m${funcNum}`;
      // https://github.com/ethereum/web3.js/issues/2077
      const munged = [ last_block, ...args ]
            .map(m => isBigNumber(m) ? m.toString() : m);

      debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- START --- ${JSON.stringify(munged)}`);
      let block_send_attempt = last_block;
      let block_repeat_count = 0;
      while ( ! timeout_delay || block_send_attempt < last_block + timeout_delay ) {
        let r_maybe = false;

        debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- TRY`);
        try {
          const r_fn = await ethersCtc[funcName](munged, {value});
          r_maybe = await r_fn.wait();
        } catch (e) {
          debug(e);
          // XXX What should we do...? If we fail, but there's no timeout delay... then we should just die
          await Timeout.set(1);
          const current_block = await ethersp.getBlockNumber();
          if ( current_block == block_send_attempt ) {
            block_repeat_count++; }
          block_send_attempt = current_block;
          if ( timeout_delay && block_repeat_count > 32 ) {
            throw Error(`${shad}: ${label} send ${funcName} ${timeout_delay} --- REPEAT @ ${block_send_attempt} x ${block_repeat_count}`); }
          debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- TRY FAIL --- ${last_block} ${current_block} ${block_repeat_count} ${block_send_attempt}`);
          continue; }

        assert(r_maybe != false);
        const ok_r = await fetchAndRejectInvalidReceiptFor(r_maybe.transactionHash);

        debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- OKAY`);

        // XXX It might be a little dangerous to rely on the polling to just work

        // It may be the case that the next line could speed things up?
        // last_block = ok_r.blockNumber;
        void(ok_r);

        return await recv( label, funcNum, timeout_delay ); }

      // XXX If we were trying to join, but we got sniped, then we'll
      // think that there is a timeout and then we'll wait forever for
      // the timeout message.

      debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- FAIL/TIMEOUT`);
      const rec_res = {};
      rec_res.didTimeout = true;
      return rec_res; };

    const recv_top = async (label, okNum, ok_cnt, timeout_delay) => {
      return recv(label, okNum, timeout_delay);
    };

    // https://docs.ethers.io/ethers.js/html/api-contract.html#configuring-events
    const recv = async (label, okNum, timeout_delay) => {
      const ok_evt = `e${okNum}`;
      debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- START`);

      let block_poll_start = last_block;
      let block_poll_end = block_poll_start;
      while ( ! timeout_delay || block_poll_start < last_block + timeout_delay ) {
        void(eventOnceP); // This might be nice for performance, but it may miss things too.
        const es = await ethersp.getLogs({
          fromBlock: block_poll_start,
          toBlock: block_poll_end,
          address: ethersCtc.address,
          topics: [ethersCtc.interface.getEventTopic(ok_evt)],
        });
        if ( es.length == 0 ) {
          debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- RETRY`);
          block_poll_start = block_poll_end;

          await Timeout.set(1);
          void(ethersBlockOnceP); // This might be a better option too, because we won't need to delay
          block_poll_end = await ethersp.getBlockNumber();

          continue;
        } else {
          debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- OKAY`);

          const ok_e = es[0];

          const ok_r = await fetchAndRejectInvalidReceiptFor(ok_e.transactionHash);
          void(ok_r);
          const ok_t = await ethersp.getTransaction(ok_e.transactionHash);
          debug(`${ok_evt} gas was ${ok_t.gas} ${ok_t.gasPrice}`);

          updateLast(ok_t);
          const [ ok_bal, ok_vals ] = getEventData(ok_evt, ok_e);

          debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- OKAY --- ${JSON.stringify(ok_vals)}`);
          return { didTimeout: false, data: ok_vals, value: ok_t.value, balance: ok_bal, from: ok_t.from };
        }
      }

      debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- TIMEOUT`);
      const rec_res = {};
      rec_res.didTimeout = true;
      return rec_res; };

    return { ...ctc, sendrecv: sendrecv_top, recv: recv_top, iam, wait }; };

  // Not sure where the v4 contract docs are but this was just as good
  // https://docs.ethers.io/ethers.js/v5-beta/api-contract.html#deployment
  const deploy = async (bin) => {
    const { ABI, Bytecode } = bin._Connectors.ETH;
    const factory = new ethers.ContractFactory(ABI, Bytecode, networkAccount);
    const contract = await factory.deploy();
    await contract.deployed(); // Wait for it to actually be deployed.
    const deployTxn = await networkAccount.provider.getTransaction(contract.deployTransaction.hash);
    // XXX the equivalent of rejectInvalidReceiptFor?
    // This may be handled already in contract.deployed()

    const ctc = { address: contract.address, creation_block: deployTxn.blockNumber };
    ctc.info = `{"address": "${ctc.address}", "creation_block": ${ctc.creation_block}}`;

    return await attach(bin, ctc);
  };

  return { deploy, attach, networkAccount }; };

export const ctcFromInfo = (infoStr) => {
  const obj = JSON.parse(infoStr);
  if (!obj.address) {
    throw Error(`Missing address`); }
  else if (!obj.creation_block) {
    throw Error(`Missing creation_block`); }
  else { return obj; } };

export const newAccountFromMnemonic = async (phrase) => {
  const ethersp = await etherspP;
  const networkAccount = ethers.Wallet.fromMnemonic(phrase).connect(ethersp);
  const acc = await connectAccount(networkAccount);
  return acc; };

export const newTestAccount = async (startingBalance) => {
  debug(`newTestAccount(${startingBalance})`);
  requireIsolatedNetwork();
  const ethersp = await getEthersP();
  const prefunder = ethersp.getSigner();

  const networkAccount = ethers.Wallet.createRandom().connect(ethersp);
  const to = networkAccount.address;

  try {
    debug(`awaiting transfer: ${to}`);
    await transfer(networkAccount, prefunder, startingBalance);
    debug(`got transfer. awaiting connectAccount: ${to}`);
    const acc = await connectAccount(networkAccount);
    debug(`got connectAccount: ${to}`);
    return acc;
  } catch (e) {
    console.log(`Trouble with account ${to}`);
    throw e;
  }
};

export const getBlockNumber = async () => {
  const ethersp = await getEthersP();
  return await ethersp.getBlockNumber();
};

const waitUntilBlock = async (targetTime) => {
  const ethersp = await getEthersP();
  return await Promise((resolve) => {
    const onBlock = async (blockNumber) => {
      if (blockNumber >= targetTime) {
        ethersp.off('block', onBlock);
        resolve(blockNumber);
      }
    };
    ethersp.on('block', onBlock);
    // Also "re-emit" the current block
    getBlockNumber().then(onBlock);
  });
};

export const fastForwardTo = async (targetTime) => {
  requireIsolatedNetwork('fastForwardTo');
  while (await getBlockNumber() < targetTime) {
    await nextBlock();
  }
};

const isIsolatedNetwork =
      connectorMode.startsWith('ETH-test-dockerized') ||
      connectorMode.startsWith('ETH-test-embedded');

const requireIsolatedNetwork = (label) => {
  if (!isIsolatedNetwork) {
    throw Error(`Invalid operation ${label} in REACH_CONNECTOR_MODE=${connectorMode}`);
  }
};

const dummyAccountP = (async () => {
  if (isIsolatedNetwork) {
    return await newTestAccount(toWeiBigNumber('1000', 'ether')).catch();
  } else {
    return null;}
})();

export const nextBlock = async () => {
  requireIsolatedNetwork('nextBlock');
  const dummyAccount = await dummyAccountP;
  const acc = dummyAccount.networkAccount;
  return await transfer(acc, acc, toWeiBigNumber('0', 'ether'));
};
