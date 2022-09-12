
import { Button } from '../common/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export const MapWalletConnect = () => {
    return (
      <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button text="Connect Wallet" onClick={openConnectModal}/>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button" className="text-stone-200 bg-stone-800 rounded-lg px-4 py-3 font-poppins">
                        Wrong network
                    </button>
                  );
                }
  
                return (
                  <div style={{ display: 'flex', gap: 12 }} className="">
                    
                    <button
                      className="flex items-center text-stone-200 font-poppins rounded-lg px-4 py-1.5 bg-stone-800 gap-4"
                      onClick={ openChainModal }
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 16, height: 16 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
  
                    <button onClick={openAccountModal} type="button" className="text-stone-200 font-poppins rounded-lg px-3 py-1.5 bg-stone-800">
                      <div className="flex flex-row items-center justify-start gap-4">
                        <div>
                          { account.displayBalance ? `${account.displayBalance}` : ''}
                        </div>
                        <div className="bg-stone-600 rounded-lg px-2">
                          { account.displayName }
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
};