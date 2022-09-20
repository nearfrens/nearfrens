
export interface IProviderKey {
    ethereumMainet?: string;
    ethereumGoerli?: string;
    polygonMainet?: string;
    polygonMumbai?: string;
    optimismMainet?: string;
    optimismGoerli?: string;
}
  
export const providerKey: IProviderKey = {
    ethereumGoerli: process.env.REACT_APP_ALCHEMY_ETHEREUM_GOERLI,
    polygonMumbai: process.env.REACT_APP_ALCHEMY_POLYGON_MUMBAI,
    optimismGoerli: process.env.REACT_APP_ALCHEMY_OPTIMISM_GOERLI,
};

export enum EnumNetwork {
    EthereumMainet = "Ethereum",
    EthereumGoerli = "Goerli",
    PolygonMainet = "Polygon",
    PolygonMumbai = "Polygon Mumbai",
    OptimismMainet = "Optimism",
    OptimismGoerli = "Optimism Goerli",
};
