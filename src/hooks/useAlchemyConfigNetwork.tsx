import { useNetwork } from "wagmi";
import { EnumNetwork, providerKey } from "../interface/network";
import { AlchemySettings, Network } from "alchemy-sdk";


export const useAlchemyConfigNetwork = (): [AlchemySettings, EnumNetwork?] => {
    const { chain } = useNetwork();
    
    let apiKey;
    let network;
    let enumNetwork;

    if (chain?.name === "Goerli") {
        apiKey = providerKey.ethereumGoerli;
        network = Network.ETH_GOERLI;
        enumNetwork = EnumNetwork.EthereumGoerli;
    } else if (chain?.name === "Ethereum") {
        apiKey = providerKey.ethereumMainet;
        network = Network.ETH_MAINNET;
        enumNetwork = EnumNetwork.EthereumMainet;
    } else if (chain?.name === "Polygon") {
        apiKey = providerKey.polygonMainet;
        network = Network.MATIC_MAINNET;
        enumNetwork = EnumNetwork.PolygonMainet;
    } else if (chain?.name === "Polygon Mumbai") {
        apiKey = providerKey.polygonMumbai;
        network = Network.MATIC_MUMBAI;
        enumNetwork = EnumNetwork.PolygonMumbai;
    } else if (chain?.name === "Optimism") {
        apiKey = providerKey.optimismMainet;
        network = Network.OPT_MAINNET;
        enumNetwork = EnumNetwork.OptimismMainet;
    } else if (chain?.name === "Optimism Goerli") {
        apiKey = providerKey.optimismGoerli;
        network = Network.OPT_GOERLI;
        enumNetwork = EnumNetwork.OptimismGoerli;
    } else {
        console.log("Network not found,", chain?.name);
        enumNetwork = undefined;
    }

    const alchemyConfig = { apiKey: apiKey, network: network };

    return [ alchemyConfig, enumNetwork ];
}
