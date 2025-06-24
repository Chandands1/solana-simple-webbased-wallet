import { Connection } from '@solana/web3.js'
import { ethers } from 'ethers'

export const fetchSolBalance = async (publicKey) => {
  const connection = new Connection('https://api.mainnet-beta.solana.com')
  const balance = await connection.getBalance(publicKey)
  return balance / 1e9
}

export const fetchEthBalance = async (address) => {
  const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY')
  const balance = await provider.getBalance(address)
  return ethers.formatEther(balance)
}
