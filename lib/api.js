require('dotenv').config()

const { getAzureCredentials, getAzureKeyClient, getAzureSecretClient } = require('./client')
const { getJsonWebKey, getAddressFromPrivate } = require('./utils')

// import the jwk to the key vault
const storeVaultKey = async (privateKey) => {
  console.log(`Started request to import Vault key in ${process.env.AZURE_KEY_VAULT}...`)

  try {
    const credentials = getAzureCredentials()
    const client = getAzureKeyClient(process.env.AZURE_KEY_VAULT, credentials)
    const jwk = getJsonWebKey(privateKey)

    console.log(`Importing private key for ${jwk.kid}...`)
    const key = await client.importKey(jwk.kid, jwk)
    console.log(`Successfully imported Vault key. Key ID: ${key.id}`)

    return key
  } catch (e) {
    throw Error('Error importing Vault key in Azure Key Vault:\n' + e);
  }
}

// get the jwk for an address from the key vault
const retrieveVaultKey = async (address) => {
  console.log(`Started request to retrieve Vault key from ${process.env.AZURE_KEY_VAULT}...`)

  try {
    const credentials = getAzureCredentials()
    const client = getAzureKeyClient(process.env.AZURE_KEY_VAULT, credentials)

    console.log(`Retrieving private key for ${address}...`)
    const jwk = await client.getKey(address)
    console.log(`Successfully retrieved key. Key ID: ${jwk.id}`)

    return jwk
  } catch (e) {
    throw Error('Error retrieving key from Azure Key Vault:\n' + e)
  }
}

const storeKey = async (privateKey) => {
  console.log(`Started request to store private key in ${process.env.AZURE_KEY_VAULT}...`)

  try {
    const credentials = getAzureCredentials()
    const client = getAzureSecretClient(process.env.AZURE_KEY_VAULT, credentials)
    const address = getAddressFromPrivate(privateKey)

    console.log(`Storing private key for ${address}...`)
    const secret = await client.setSecret(address, privateKey)
    console.log(`Successfully stored private key.`)

    return secret.name
  } catch (e) {
    throw Error('Error storing key in Azure Key Vault:\n' + e);
  }
}

const retrieveKey = async (publicKey) => {
  console.log(`Started request to retrieve private key from ${process.env.AZURE_KEY_VAULT}...`)

  try {
    const credentials = getAzureCredentials()
    const client = getAzureSecretClient(process.env.AZURE_KEY_VAULT, credentials)

    console.log(`Retrieving private key for ${publicKey}...`)
    const secret = await client.getSecret(publicKey)
    console.log(`Successfully retrieved private key.`)

    return secret.value;
  } catch (e) {
    throw Error('Error retrieving private key secret from Azure Key Vault:\n' + e);
  }
}

module.exports = {
  storeVaultKey,
  retrieveVaultKey,
  storeKey,
  retrieveKey
}
