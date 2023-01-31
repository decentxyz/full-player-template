const getIpfsLink = (hash) =>
  hash?.indexOf?.("ipfs://") > -1
    ? hash.replace("ipfs://", "https://nftstorage.link/ipfs/")
    : hash;

export default getIpfsLink;
