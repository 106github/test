import { default as Web3} from 'web3';
const Tx = require('ethereumjs-tx');
 
const transFunc = async() => {
const addressFrom = '0x5b781f44D45091feED513b585047142Ec3F1aB29'
//const privKey = '18cd85207759baab0ecdbe0ecb668e4e2ca94057e5bc2c175c60bbd47272ee6d'
const trigger_contract = '0x0a024a1d3FAc27809bfEC6940783B1D903829f17'
const addressTo = "0x55a1119634700615234595AaA2f1C55ba63366e9";

const addressFrom_substr=addressFrom.substr(2);
const addressTo_substr=addressTo.substr(2);

function sendSigned(txData, cb) {
  //const privateKey = Buffer.from(privKey, 'hex')  
  const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');
  const transaction = new Tx(txData)
  transaction.sign(privateKey)
  const serializedTx = transaction.serialize().toString('hex')
  web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
}

//let encoded_tx = trigger_erc20_contract.mytt.methods.transfer_by_owner(addressFrom,'0x55a1119634700615234595AaA2f1C55ba63366e9').encodeABI()
 
web3.eth.getTransactionCount(addressFrom).then(txCount => {
  const txData = {
    nonce: web3.utils.toHex(txCount),
    //gasPrice: 20000000000, 
    //gasLimit: 200000,
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    gasLimit: web3.utils.toHex(800000),
    from: addressFrom,
    to: trigger_contract,
    value: '0x00',
    //data: encoded_tx,
    data: '0x' + 'c3478620' + '000000000000000000000000'+ addressFrom_substr +'000000000000000000000000'+addressTo_substr,
    chainId: 4
  }

   sendSigned(txData, function(err, result) {
    if (err) return console.log('error', err)
    console.log('sent', result)
})

})

}





window.App = {
  start: function() {   
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      
    });
   
    transFunc();
  }
};

window.addEventListener('load', function() {
 
   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
   if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }
  App.start();
});