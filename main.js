const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://vbox6:8545"));

let account = process.env.ACCOUNT;

let count = parseInt(process.env.COUNT || 20);

let source = fs.readFileSync('simple-storage.sol', 'utf8');
let compiledContract = solc.compile(source);
let abi = compiledContract.contracts[':SimpleStorage'].interface;
let bytecode = compiledContract.contracts[':SimpleStorage'].bytecode;
let gasEstimate = web3.eth.estimateGas({data: "0x" + bytecode});
let MyContract = web3.eth.contract(JSON.parse(abi));

if (account.indexOf('0x') !== 0) {
    account = '0x' + account;}

var myContractFunction = function(n) {
    
    MyContract.new({
        from: account,
        data: "0x" + bytecode,
        gas: gasEstimate + n
    }, function (err, myContract) {
        if (err) {
            console.log(err);
        } else {
            if (!myContract.address) {
                console.log('Tx hash: ' + myContract.transactionHash) // The hash of the transaction, which deploys the contract
            } else {
                console.log('Contracts address: ' + myContract.address) // the contract address
            }
        }
    });
}

var loadNode = function(){
    for(var i =0; i < count; i++){
        myContractFunction(i);
    }
}

loadNode();