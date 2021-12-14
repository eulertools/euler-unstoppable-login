import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import noop from 'lodash/noop';
import { useState, useEffect } from 'react';

// Metamask, TrustWallet in Android, etc
export const injected = new InjectedConnector({ supportedChainIds: [56] });

export enum EChainIds {
  BSC_MAINNET = 56,
}

export const networkIDToChainID = {
  bsc: EChainIds.BSC_MAINNET,
};

// WalletConnect via QRCode
export const baseWalletConnectOptions = {
  rpc: {
    56: 'https://bsc-dataseed.binance.org/',
  },
  qrcode: true,
};

export const SCAN_URLS = {
  56: 'https://bscscan.com',
};

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

interface useInactiveListenerConfig {
  suppress: boolean;
  onConnect?: () => void;
  onChainChanged?: (chainId: string | number) => void;
  onNetworkChanged?: (chainId: string | number) => void;
  onAccountsChanged?: (accounts: string[]) => void;
}

export function useInactiveListener(config: useInactiveListenerConfig) {
  const {
    suppress = false,
    onConnect = noop,
    onChainChanged = noop,
    onAccountsChanged = noop,
    onNetworkChanged = noop,
  } = config;

  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window as any;

    const handleConnect = () => {
      console.info("Handling 'connect' event");
      activate(injected);
      onConnect();
    };
    const handleChainChanged = (chainId: string | number) => {
      console.info("Handling 'chainChanged' event with payload", chainId);
      activate(injected);
      onChainChanged(chainId);
    };
    const handleAccountsChanged = (accounts: string[]) => {
      console.info("Handling 'accountsChanged' event with payload", accounts);
      if (accounts.length > 0) {
        activate(injected);
      }
      onAccountsChanged(accounts);
    };
    const handleNetworkChanged = (networkId: string | number) => {
      console.info("Handling 'networkChanged' event with payload", networkId);
      activate(injected);
      onNetworkChanged(networkId);
    };

    if (ethereum?.on && !active && !error && !suppress) {
      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);
    }

    return () => {
      if (ethereum?.removeListener) {
        ethereum.removeListener('connect', handleConnect);
        ethereum.removeListener('chainChanged', handleChainChanged);
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('networkChanged', handleNetworkChanged);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, error, suppress, activate]);
}
