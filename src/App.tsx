
import { AboutPage } from "./components/about/aboutPage";
import { MapPage } from "./components/map/mapPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { providerKey } from "./interface/network";
import XmtpProvider from "./providers/XmtpProvider";
import "@rainbow-me/rainbowkit/styles.css";
import "./App.css";


const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
  ],
  [
    alchemyProvider({ apiKey: providerKey.polygonMainet }),
    alchemyProvider({ apiKey: providerKey.ethereumGoerli }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "nearfrens",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function App() {
  return (
      <div className="App">
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={midnightTheme()}>
            <XmtpProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={ <MapPage/> } />
                  <Route path="/about" element={ <AboutPage />} />
                </Routes>
              </BrowserRouter>
            </XmtpProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
  );
}

export default App;
