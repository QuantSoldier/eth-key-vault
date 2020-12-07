const { KeyClient } = require('@azure/keyvault-keys')
const { EnvironmentCredential } = require('@azure/identity')

const getAzureCredentials = () => {
  try {
    console.log("Getting Azure Credentials from environment...")
    const credential = new EnvironmentCredential()
    console.log("Using Azure Credentials:\n", credential)
    return credential
  } catch (e) {
    throw Error("Error retreiving Azure Credentials from environment:\n", e)
  }
}

// get the azure key client for a given url and log credential information
const getAzureKeyClient = (vaultEndpoint, credential) => {
  try {
    console.log(`Getting Azure Client for Key Vault at ${vaultEndpoint}`)
    const client = new KeyClient(vaultEndpoint, credential)
    console.log("Successfully retrieved Key Client.")
    return client
  } catch (e) {
    throw Error("Error retreiving Azure Key Client:\n", e)
  }
}

module.exports = {
  getAzureCredentials,
  getAzureKeyClient
}