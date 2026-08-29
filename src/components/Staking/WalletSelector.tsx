import { useWeb3React } from '@web3-react/core';
import { useCallback, FC } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useModal } from '_shared/modal';
import { shortAddress } from 'lib/address';
import ConnectYourWallet from './ConnectYourWallet';

const WalletSelector: FC = () => {
  const { showModal } = useModal();

  const { active, account, chainId, deactivate, error } = useWeb3React();

  const onUnlinkAnonymousWallet = async () => {
    deactivate();
    console.info('Wallet disconnected');
  };

  const signAnonymousWallet = async () => {
    if (!active || !account) {
      const connectWalletModal = showModal(ConnectYourWallet, {
        onWalletConnected: () => {
          connectWalletModal.hide();
        },
        onCancel: () => {
          connectWalletModal.hide();
        },
      });
    }
  };

  const onWrongWalletNetwork = useCallback(() => {
    console.error(
      'You are on an unsupported/different network, switch to the correct one from your wallet network selector.',
    );
  }, []);

  // If user is in a different network, prompt them to switch to the correct one
  if (active && chainId !== 56) {
    return (
      <Button size='large' variant='outlined' onClick={onWrongWalletNetwork}>
        Wrong Network
        <span style={{ paddingLeft: '4px' }}>🔴</span>
      </Button>
    );
  }

  // Streamlined a single Button view for both Mobile and Browser Views
  return account ? (
    <Button disableRipple size='large' variant='outlined' endIcon={<CloseIcon onClick={onUnlinkAnonymousWallet} />}>
      <b>{shortAddress(account)}</b>
      <span style={{ paddingLeft: '4px' }}>🟢</span>
    </Button>
  ) : (
    <Button size='large' variant='outlined' onClick={signAnonymousWallet}>
      Connect Wallet
      <span style={{ paddingLeft: '4px' }}>{error ? '🔴' : '🟠'}</span>
    </Button>
  );
};

export default WalletSelector;
