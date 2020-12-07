import secp256k1 from 'secp256k1'

const derivePublicKey = (privKey) => {
  return secp256k1.publicKeyCreate(privKey, false)
}

const deriveAddress = (publicKey) => {
  const publicKeyBuffer = Buffer.from(publicKey.slice(1)) // slice the 04 (uncompressed flag) byte from the public key
	return keccak('keccak256').update(publicKeyBuffer).digest().slice(-20).toString('hex')
}

// take a ethereum private key and convert it to JWK
// JWK formatting
// - d: encoded private key
// - x: first half of encoded public key, without first bit indicating format
// - y: second half of encoded public key
export const getJsonWebKey = (privKey) => {
  const privateKey = Buffer.from(privKey, 'hex')
  const publicKey = derivePublicKey(privateKey)
  const address = deriveAddress(publicKey)

  return {
    kid: '0x' + address,
    kty: 'EC',
    crv: 'P-256K',
    keyOps: [
      'encrypt',
      'decrypt',
      'import',
      'sign', 
      'verify',
      'unwrapKey',
      'wrapKey'
    ],
    d: privateKey, // private key byte array
    x: Buffer.from(publicKey.slice(1, 33)), // 1st half public key byte array (skip the encoding byte)
    y: Buffer.from(publicKey.slice(33, 66)), // 2nd half public key byte array
  }
}