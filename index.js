const ethers = require("ethers");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("How many wallets would you like to generate? ", function(numWallets) {
  const numSeedPhrases = parseInt(numWallets, 10); // number of seed phrases to generate
  if (isNaN(numSeedPhrases) || numSeedPhrases <= 0) {
    console.log("Please enter a valid positive number.");
    rl.close();
    return;
  }

  const seedPhrases = [];

  for (let i = 0; i < numSeedPhrases; i++) {
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic.phrase; // mnemonic seed phrase
    const address = wallet.address; // public address
    const privateKey = wallet.privateKey.slice(2); // private key
    console.log(`Seed phrase ${i + 1}: ${mnemonic} Address: ${address} Private Key: ${privateKey}`);
    seedPhrases.push({
      "Seed phrase number": i + 1,
      "Seed phrase": mnemonic,
      "Public address": address,
      "Private key": privateKey
    });
  }

  const formattedData = seedPhrases.map((seedObj) => {
    return Object.values(seedObj).join("\t");
  });

  const table = `Seed phrase number\tSeed phrase\tPublic address\t\tPrivate key\n${formattedData.join("\n")}`;

  // write seed phrases to a file named 'wallets.txt'
  fs.writeFile("wallets.txt", table, (err) => {
    if (err) throw err;
    console.log("Seed phrases, public addresses, and private keys saved to wallets.txt");
  });

  rl.close();
});
