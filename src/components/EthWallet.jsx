import { useState } from "react";
import { HDNodeWallet } from "ethers";

export default function EthWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const addWallet = async () => {
    const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
    const hdNode = HDNodeWallet.fromMnemonic({ mnemonic, path: derivationPath });
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, hdNode.address]);
  };

  return (
    <div>
      <button onClick={addWallet}>
        Add ETH wallet
      </button>
      {addresses.map((p, i) => (
        <div key={i}>
          Eth - {p}
        </div>
      ))}
    </div>
  );
}
