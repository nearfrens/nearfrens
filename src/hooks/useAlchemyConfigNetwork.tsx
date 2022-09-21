import { useNetwork } from "wagmi";
import { EnumNetwork, providerKey } from "../interface/network";
import { AlchemySettings, Network } from "alchemy-sdk";


export interface QueryAlchemyConfigNetwork {
    alchemyConfig: AlchemySettings;
    enumNetwork?: EnumNetwork;
    ethersNetwork?: string;
};

export const useAlchemyConfigNetwork = (): QueryAlchemyConfigNetwork => {
    const { chain } = useNetwork();
    
    let apiKey;
    let network;
    let enumNetwork;
    let ethersNetwork;

    if (chain?.name === "Goerli") {
        apiKey = providerKey.ethereumGoerli;
        network = Network.ETH_GOERLI;
        enumNetwork = EnumNetwork.EthereumGoerli;
        ethersNetwork = chain.network;
    } else if (chain?.name === "Ethereum") {
        apiKey = providerKey.ethereumMainet;
        network = Network.ETH_MAINNET;
        enumNetwork = EnumNetwork.EthereumMainet;
        ethersNetwork = chain.network;
    } else if (chain?.name === "Polygon") {
        apiKey = providerKey.polygonMainet;
        network = Network.MATIC_MAINNET;
        enumNetwork = EnumNetwork.PolygonMainet;
        ethersNetwork = chain.network;
    } else if (chain?.name === "Polygon Mumbai") {
        apiKey = providerKey.polygonMumbai;
        network = Network.MATIC_MUMBAI;
        enumNetwork = EnumNetwork.PolygonMumbai;
        ethersNetwork = chain.network;
    } else if (chain?.name === "Optimism") {
        apiKey = providerKey.optimismMainet;
        network = Network.OPT_MAINNET;
        enumNetwork = EnumNetwork.OptimismMainet;
        ethersNetwork = chain.network;
    } else if (chain?.name === "Optimism Goerli") {
        apiKey = providerKey.optimismGoerli;
        network = Network.OPT_GOERLI;
        enumNetwork = EnumNetwork.OptimismGoerli;
        ethersNetwork = chain.network;
    } else {
        console.log("Network not found,", chain?.name);
        enumNetwork = undefined;
    }

    const alchemyConfig = { apiKey: apiKey, network: network };

    return { alchemyConfig, enumNetwork, ethersNetwork };
}
