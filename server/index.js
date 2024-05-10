const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = new MerkleTree(niceList).getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { proof, recipient, index } = req.body;
  console.log(proof, recipient, index)
  const isInTheList = verifyProof(proof, recipient, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
