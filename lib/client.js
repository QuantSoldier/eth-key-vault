const { KeyClient, CryptographyClient } = require('@azure/keyvault-keys')
const { SecretClient } = require("@azure/keyvault-secrets")
const { EnvironmentCredential } = require('@azure/identity')

const getAzureCredentials = () => {
  try {
    console.log("Getting Azure Credentials from environment...")
    const credential = new EnvironmentCredential()
    console.log("Successfully retrieved credentials for client")
    return credential
  } catch (e) {
    throw Error("Error retreiving Azure Credentials from environment:\n" + e)
  }
}

// get the azure key client for a given url and log credential information
const getAzureKeyClient = (vaultEndpoint, credential) => {
  try {
    console.log(`Getting Azure Key Client for Key Vault at ${vaultEndpoint}`)
    const client = new KeyClient(vaultEndpoint, credential)
    console.log("Successfully retrieved Key Client.")
    return client
  } catch (e) {
    throw Error("Error retreiving Azure Key Client:\n" + e)
  }
}

const getAzureSecretClient = (vaultEndpoint, credential) => {
  try {
    console.log(`Getting Azure Secret Client for Key Vault at ${vaultEndpoint}`)
    const client = new SecretClient(vaultEndpoint, credential)
    console.log("Successfully retrieved Secret Client.")
    return client
  } catch (e) {
    throw Error("Error retreiving Azure Secret Client:\n" + e)
  }
}

const getAzureCryptographyClient = (key, credential) => {
  try {
    console.log(`Getting Cryptography Client...`)
    const client = new CryptographyClient(key, credential)
    console.log("Successfully retrieved Cryptography Client.")
    return client
  } catch (e) {
    throw Error("Error retreiving Azure Key Client:\n" + e)
  }
}

module.exports = {
  getAzureCredentials,
  getAzureKeyClient,
  getAzureSecretClient
}