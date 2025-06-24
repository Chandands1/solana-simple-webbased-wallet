import { useState } from 'react'
import { generateMnemonic } from 'bip39'
import './App.css'
import SolanaWallet from './components/SolanaWallet'
import EthWallet from './components/EthWallet'

function App() {
  const [mnemonic, setMnemonic] = useState('')

  return (
    <>
      <button onClick={async () => {
        const mn = await generateMnemonic()
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>
      <input type="text" value={mnemonic} readOnly />
      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}
    </>
  )
}
export default App
