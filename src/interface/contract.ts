import { EnumNetwork } from "./network";

export interface IContractAddress {
    ethereumMainet?: string;
    ethereumGoerli?: string;
    polygonMainet?: string;
    polygonMumbai?: string;
    optimismMainet?: string;
    optimismGoerli?: string;
}
  
export const NearFrensContractAddress: IContractAddress = {
    ethereumGoerli: process.env.REACT_APP_CONTRACT_ETHEREUM_GOERLI,
    polygonMumbai: process.env.REACT_APP_CONTRACT_POLYGON_MUMBAI,
    optimismGoerli: process.env.REACT_APP_CONTRACT_OPTIMISM_GOERLI,
};

const NearFrensContractAddressMapping: Record<string,string|undefined> = {};
NearFrensContractAddressMapping[EnumNetwork.EthereumGoerli] = NearFrensContractAddress.ethereumGoerli;
NearFrensContractAddressMapping[EnumNetwork.EthereumMainet] = NearFrensContractAddress.ethereumMainet;
NearFrensContractAddressMapping[EnumNetwork.PolygonMainet] = NearFrensContractAddress.polygonMainet;
NearFrensContractAddressMapping[EnumNetwork.PolygonMumbai] = NearFrensContractAddress.polygonMumbai;
NearFrensContractAddressMapping[EnumNetwork.OptimismGoerli] = NearFrensContractAddress.optimismGoerli;
NearFrensContractAddressMapping[EnumNetwork.OptimismMainet] = NearFrensContractAddress.optimismMainet;
export { NearFrensContractAddressMapping }
