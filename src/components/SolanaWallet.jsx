import { useState } from 'react'
import { mnemonicToSeed } from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import { Keypair } from '@solana/web3.js'
import nacl from 'tweetnacl'
import { fetchSolBalance } from '../services/blockchainService'

export default function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [publicKeys, setPublicKeys] = useState([])
  const [solBalances, setSolBalances] = useState([])

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic)
    const path = `m/44'/501'/${currentIndex}'/0'`
    const derivedSeed = derivePath(path, seed.toString('hex')).key
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
    const keypair = Keypair.fromSecretKey(secret)
    setCurrentIndex(currentIndex + 1)
    setPublicKeys([...publicKeys, keypair.publicKey])
    const balance = await fetchSolBalance(keypair.publicKey)
    setSolBalances([...solBalances, balance])
  }

  return (
    <div>
      <button onClick={addWallet}>
        Add Solana wallet
      </button>
      {publicKeys.map((p, i) => (
        <div key={i}>
          {p.toBase58()} - {solBalances[i] !== undefined ? `${solBalances[i]} SOL` : 'Loading...'}
        </div>
      ))}
    </div>
  )
}
