
import { Button } from '../common/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useParamsStyle } from '../../hooks/useParamsStyle';


export const MapWalletConnect = () => {
    const [paramsStyle] = useParamsStyle();
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
                    <button 
                      className={`
                        px-3
                        h-9
                        flex flex-row items-center justify-start
                        bg-stone-800
                        ${ 
                          (paramsStyle.isFun) ?
                              "bg-gradient-to-r from-pink-600/50 to-blue-600/50 hover:from-pink-600/60 hover:to-blue-600/60"
                              :
                              "bg-stone-800 bg-opacity-50 hover:bg-opacity-60"
                        }
                        font-poppins
                        text-sm
                        text-stone-200 hover:text-white
                        rounded-lg                    
                      `}                  
                      onClick={ openConnectModal } 
                      type="button" 
                    >
                      Connect Wallet
                    </button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <Button text="wrong network" onClick={ openChainModal } />
                  );
                }
  
                return (
                  <div className="flex flex-row items-center justify-start gap-2">
                    
                    <button
                      className={`
                        px-3
                        h-9
                        flex flex-row items-center justify-start gap-2
                        bg-stone-800
                        ${ 
                          (paramsStyle.isFun) ?
                              "bg-gradient-to-r from-pink-600/50 to-blue-600/50 hover:from-pink-600/60 hover:to-blue-600/60"
                              :
                              "bg-stone-800 bg-opacity-50 hover:bg-opacity-60"
                        }
                        font-poppins
                        text-sm
                        text-stone-200 hover:text-white
                        rounded-lg
                      `}
                      onClick={ openChainModal }
                      type="button"
                    >
                      { chain.hasIcon && (
                        <div>
                          {chain.iconUrl && (
                            <img
                              alt={ chain.name ?? 'Chain icon' }
                              src={ chain.iconUrl }
                              style={{ width: 16, height: 16 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
  
                    <button 
                      className={`                      
                        px-3
                        h-9
                        flex flex-row items-center justify-start
                        bg-stone-800
                        ${
                          (paramsStyle.isFun) ?
                              "bg-gradient-to-r from-pink-600/50 to-blue-600/50 hover:from-pink-600/60 hover:to-blue-600/60"
                              :
                              "bg-stone-800 bg-opacity-50 hover:bg-opacity-60"
                        }
                        font-poppins
                        text-sm
                        text-stone-200 hover:text-white
                        rounded-lg
                      `}
                      onClick={openAccountModal} 
                      type="button" 
                    >
                      <div className="flex flex-row items-center justify-start gap-2">
                        <div>
                          { account.displayBalance ? `${account.displayBalance}` : ''}
                        </div>
                        <div className="bg-stone-700 rounded-lg px-2">
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