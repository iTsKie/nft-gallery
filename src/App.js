//src/App.js
//Import libraries and components
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import NFTCard from './components/NFTCard';
import CollectionSearch from './components/CollectionSearch';


function App() {
  //State variables
  const [nfts, setNFTs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [address, setAddress] = useState('0xaAdBA140Ae5e4c8a9eF0Cc86EA3124b446e3E46A')

  //function to fetch nfts by collection
  const fetchCollection = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://dimensional-frequent-liquid.discover.quiknode.pro/9be838e3c51257d9f2a970bc165afb8bbd54825b/");
    const collection = await provider.send("qn_fetchNFTsByCollection", {
      collection: address,
      page: 1,
      perPage: 40})
    return collection
  }

  //useEffect renders every time address is set
  useEffect(() => {
    fetchCollection()
    .then(data => {
      setNFTs(data.tokens)
      setIsLoading(false)
      console.log(data)
    })
    .catch(err => setNFTs([]))
  }, [address]);

  
  //jsx containing our conditional rendering
  return (
    <div className='container mx-auto'>
      <CollectionSearch searchText={(text) => setAddress(text)} />
      {!isLoading && nfts.length === 0 && <h1 className='text-5xl text-center mx-auto mt-32'>No Collection Found</h1>}
      <div className='grid grid-cols-3 gap-4'>
        {nfts.map(token => <NFTCard key={token.name} nft={token} />)}
      </div>
    </div>
  );
}

export default App;