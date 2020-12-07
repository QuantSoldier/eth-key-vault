#!/usr/bin/env node

const { storeKey } = require('./lib/api')

const main = async () => {
  console.log("CLI not available yet")
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})