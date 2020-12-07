import { getAzureCredentials, getAzureKeyClient } from './client'
import { getJsonWebKey } from './utils';

export const storeKey = async (privateKey, vaultEndpoint) => {
  console.log(`Started request to store key in ${vaultEndpoint}...`)

  try {
    const credentials = getAzureCredentials()
    const client = getAzureKeyClient(vaultEndpoint, credentials)
    const jwk = getJsonWebKey(privateKey)

    console.log(`Importing private key for ${jwk.kid}...`)
    const key = await client.importKey(jwk.kid, jwk)
    console.log(`Successfully imported key. Key ID: ${key.id}`)

    return key;
  } catch (e) {
    throw Error('Error storing key in Azure Key Vault:\n', e);
  }
}

export const retrieveKey = async (address, vaultEndpoint) => {
  console.log(`Started request to retrieve key from ${vaultEndpoint}...`)

  try {
    const credentials = getAzureCredentials()
    const client = getAzureKeyClient(vaultEndpoint, credentials)

    console.log(`Retrieving private key for ${address}...`)
    const jwk = await client.getKey(address)
    console.log(`Successfully retrieved key. Key ID: ${jwk.id}`)

    return Buffer.from(jwk.key.d).toString('hex')
  } catch (e) {
    throw Error('Error retrieving key from Azure Key Vault:\n', e)
  }
}
