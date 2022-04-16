# Guess Ethereum Mnemonics

The script picks 12 random words from the the [bip39 wordlist](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt), checks if it's a valid mnemonic and gets the public address via [ethers](https://docs.ethers.io/), then checks the address' balance using the [Etherescan API](https://docs.etherscan.io/). If the balance > 0, it will a message via Discord webhook.

## Story
This started as a [fun little experiment](https://twitter.com/gregskril/status/1511803381387567105) with me wondering how difficult it would be to guess a 12-word seed phrase to an active Ethereum wallet. Turns out, it's basically imposibble.

The chances of guessing an active 12-word mnemonic are 1 in 340,282,366,920,938,463,463,374,607,431,768,211,460

And that's just for a 12-word phrase. Many wallets have 24 words...

So it's technically possible, but "it is so astronomically unlikely that for all practical purposes, it is impossible, and bruteforcing all the combinations with all the computers in the works would take way more billions of years than the current age of the universe." - [loupiote2 on Reddit](https://www.reddit.com/r/ledgerwallet/comments/txk7fs/comment/i3omh74/?utm_source=share&utm_medium=web2x&context=3)

That was pretty hard to wrap my head around, but basically there's no point in running this script. 

But it does work if you still want to try :)

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
