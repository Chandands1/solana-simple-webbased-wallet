import { useState } from 'react'
import { mnemonicToSeed } from 'bip39'
import { Wallet, HDNodeWallet } from 'ethers'

export function EthWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [addresses, setAddresses] = useState([])

  return (
    <div>
      <button onClick={async function() {
        const seed = await mnemonicToSeed(mnemonic)
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`
        const hdNode = HDNodeWallet.fromMnemonic({ mnemonic, path: derivationPath })
        setCurrentIndex(currentIndex + 1)
        setAddresses([...addresses, hdNode.address])
      }}>
        Add ETH wallet
      </button>
      {addresses.map((p, i) => <div key={i}>Eth - {p}</div>)}
    </div>
  )
}
