# Ethereum Key Vault

```
       ______  __     __ __           _   __          ____ 
      / __/ /_/ /    / //_/__ __ __  | | / /__ ___ __/ / /_
     / _// __/ _ \  / ,< / -_) // /  | |/ / _ `/ // / / __/
    /___/\__/_//_/ /_/|_|\__/\_, /   |___/\_,_/\_,_/_/\__/ 
                            /___/                          
```

This package provides a Key Management System (KMS) for Ethereum P-256K Private Keys using the [Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/general/overview) service. Azure Key Vaults allow you to store cryptographic keys and secrets for usage in your applications, simplifying the key request and retrieval process.

This package provides functionality to store Ethereum Private Keys in an Azure Key Vault as both a Secrets and Keys, indexed by public Ethereum address. Secrets allow us to access the original private key, while Keys allow us to sign and verify messages. When storing, keys are accepted as an input string or `.txt`/`.pem` file(s), and then exported to the configured Azure Key Vault. Keys are retrieved by querying the Key Vault for the associated Ethereum address.

*File input still under development*

## Advantages

- **Durabilability:** Azure Key Vaults are a durable, managed cloud storage medium, meaning that your keys are not lost in the event of system failure. Storing private keys on local disk space presents the risk of machine failure, while storing keys physically risks losing the storage medium altogether.
- **Scalability:** Quickly and easily access any Ethereum account you want by making a call through the APIs. Keys can be accessed individually by address or in groups.
- **Security:** Azure Key Vaults is equipped with fully customizable IAM access control, supporting both client secret and role-based authentication methods.
- **Cost-Efficient:** Costs of running an Azure Key Vault are extremely low. More detailed info on pricing [here](https://azure.microsoft.com/en-ca/pricing/details/key-vault/).


## Setup

In order to use this package, you must have an active Azure Account Subscription and Key Vault set up. Refer to the below steps to get everything set up:

1. Sign up for a free Azure Account: https://azure.microsoft.com/en-ca/free/   

2. Setup an Azure Key Vault in your Microsoft Azure account.  
  - Portal Setup: https://docs.microsoft.com/en-us/azure/key-vault/general/quick-create-portal  
  - CLI Setup: https://docs.microsoft.com/en-us/azure/key-vault/general/quick-create-cli   

3. Add an IAM role and access policy to the Key Vault to allow your application to perform the necessary *Secrets* and *Keys* operations.
  - Client Secret: https://docs.microsoft.com/en-us/azure/key-vault/general/assign-access-policy-portal
  - Role-Based: https://docs.microsoft.com/en-us/azure/key-vault/general/rbac-guide


## Usage

This package offers a CLI for standalone use and an API for usage as a dependency in your application.

### Command Line Interface (CLI)

*CLI still under development*

1. Install the package globally via NPM.
```
npm install -g eth-key-vault
```

2. Authenticate with Azure
```
az login
```

3. Configure the necessary environment variables by running the commands below with your information:
```
export AZURE_CLIENT_ID="<azure-client-id>"
export AZURE_CLIENT_SECRET="<azure-client-secret>"
export AZURE_TENANT_ID="<azure-tenant-id>"
export AZURE_KEY_VAULT="<azure-key-vault-https-endpoint>"
```

4. Run the CLI command to start the app. You will be prompted to sign into Azure if you are not authenticated.
```
eth-key-vault-cli
```

### Dependency
1. Install this package as a dependency via `npm` or `yarn`:
```
npm install eth-key-vault
yarn add eth-key-vault
```

2. Authenticate with Azure
```
az login
```

3. Install `dotenv` and create a `.env` file at the root of your project with authentication variables required by Azure and the target key vault. Add the following variables to your current `.env` file if you already use `dotenv`.
```
# Installing dotenv
npm install dotenv

# .env
AZURE_CLIENT_ID=<azure-client-id>
AZURE_CLIENT_SECRET=<azure-client-secret>
AZURE_TENANT_ID=<azure-tenant-id>
AZURE_KEY_VAULT=<azure-key-vault-https-endpoint>
```

3. Import the functions for use
```
import { storeKey, retrieveKey } from 'eth-key-vault'
...
const address = await storeKey(MY_PRIVATE_KEY)
console.log(address)  // "0x5248cC93d9bD1C12dfB8De81d14D63e55ade0420" 
...
const privateKey = await retrieveKey(ETH_ADDRESS)
console.log(privateKey)  // "f5213e8a24a403782dc8ecab26ac639cb7b4396215c80b1d7fa71b37b24e830d"
const wallet = new ethers.Wallet(privateKey)
...
```


## Supported Functionalities

### Secrets
- `storeKey(string privateKey) => string`: This function accepts a private key string and stores it as a Secret in the Key Vault. It returns the public Ethereum address that it can be retrieved with.
- `retrieveKey(string address) => string`: This function accepts an Ethereum public address string and queries the Key Vault for a corresponding Secret. If one is found, it returns the private key as a string.

### Keys
- `storeVaultKey(string privateKey) => JsonWebKey`: This function stores a private key string as a JWK in the Key Vault for signing and verifying. Returns the generated JWK.
- `retrieveVaultKey(string address) => JsonWebKey`: This function retrieves the JWK corresponding to the public Ethereum address. Returns the generated JWK. 

*Note: You cannot access the raw private key from the JsonWebKey, it must be stored as a Secret if you want to access it later on*


## Additional Resources  

- Json Web Key RFC: https://self-issued.info/docs/draft-ietf-jose-json-web-key.html
- Azure Key Vault NodeJS API Reference: https://docs.microsoft.com/en-us/rest/api/keyvault
- Azure Key Vault NodeJS Quickstart: https://docs.microsoft.com/en-us/azure/key-vault/secrets/quick-create-node


<br/>

*Like this project? Buy me a coffee: ETH - 0xB33F3DDd63439f0EdBBee2952Ac3204113554Fd8*