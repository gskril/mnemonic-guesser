require('dotenv').config();
const fs = require('fs');
const { ethers } = require('ethers');
const { Webhook, MessageBuilder } = require('discord-webhook-node');

const discordHook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

(async () => {
  const provider = new ethers.providers.EtherscanProvider(
    'homestead',
    process.env.ETHERSCAN_API_KEY,
  );
  const balanceForAddr = async (address) => ethers.utils.formatEther(
    await provider.getBalance(address),
  );
  const randomWord = (num) => ethers.wordlists.en.getWord(num);

  // run job every second
  setInterval(async () => {
    // pick 12 random words from bip39 wordlist to form a mnemonic
    const words = Array.from({ length: 12 }, () => randomWord(Math.floor(Math.random() * 2048)));
    const mnemonic = words.join(' ');

    // check if the mnemonic is valid
    if (!ethers.utils.isValidMnemonic(mnemonic)) return;

    // get the account at the default path of the mnemonic
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
      .derivePath(ethers.utils.defaultPath);

    const { privateKey } = hdNode;
    const { publicKey } = hdNode;
    const { address } = hdNode;

    const balance = await balanceForAddr(address)
      .catch((err) => {
        // TODO: pause for 30 secs on etherscan api error then restart
        console.log(err);
        return 0;
      });

    console.log(`Mnemonic found for address ${address} with a ${balance} ETH balance`);

    if (balance > 0) {
      // add to the accounts.json file
      const accountsFile = fs.readFileSync('./accounts.json');
      const accounts = JSON.parse(accountsFile);

      accounts.push({
        mnemonic,
        privateKey,
        publicKey,
        address,
        balance,
      });

      fs.writeFile('./accounts.json', JSON.stringify(accounts), (err) => {
        if (err) console.log(err);
      });

      // send a discord message with the account info
      discordHook.send(
        new MessageBuilder()
          .setColor('#00b0f4')
          .setTitle('Mnemonic Found!')
          .setDescription(mnemonic)
          .addField('**Balance**', `${balance} ETH`, true)
          .addField('**Address**', address, true),
      );
    }
  }, 10); // check 100 mnemonics per second
})();
