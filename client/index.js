const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const tree = new MerkleTree(niceList);

  const recipient = "Kim Mann";
  const index = niceList.findIndex((i) => i === recipient);
  const proof = tree.getProof(index || 0);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    recipient: recipient,
  });

  console.log({ gift });
}

main();