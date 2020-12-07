#!/usr/bin/env node

const main = async () => {
  console.log('hi')
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})