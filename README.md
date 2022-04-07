# Guess Ethereum Mnemonics

The script picks 12 random words from the the [bip39 wordlist](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt), checks if it's a valid mnemonic and gets the public address via [ethers](https://docs.ethers.io/), then checks the address' balance using the [Etherescan API](https://docs.etherscan.io/). If the balance > 0, it will a message via Discord webhook.

## Build and run locally
```bash
# Collect repo
git clone https://github.com/gskril/mnemonic-guesser
cd mnemonic-guesser

# Install dependencies
npm install

# Update environment variables
mv .env.example .env

# Run application
npm start
```

## Environment variables
1. `DISCORD_WEBHOOK_URL`: Create a Discord Webhook URL from a personal server by following [these steps](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
2. `ETHERSCAN_API_KEY`: Get an Etherscan API key by following the [these steps](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics)
