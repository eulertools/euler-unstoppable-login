import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import React from 'react';
import Box from '@mui/material/Box';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import { baseWalletConnectOptions, EChainIds, injected } from 'hooks/useMetamaskAccount';
import Image from 'next/image';
import { styled, useTheme } from '@mui/material/styles';

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => <Slide direction='up' ref={ref} {...(props as any)} />);

interface IProps extends DialogProps {
  onCancel: () => void;
  onWalletConnected?: () => void;
}

const ConnectYourWallet: React.FC<IProps> = ({ onCancel, onWalletConnected, ...dialogProps }) => {
  const { activate } = useWeb3React();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onMetamaskWalletConnect = React.useCallback(async () => {
    // @web3-react/injected-connector
    await activate(injected);

    onWalletConnected?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onWalletConnectClick = React.useCallback(async () => {
    const walletConnectProvider = new WalletConnectConnector({
      ...baseWalletConnectOptions,
      supportedChainIds: [56],
      chainId: EChainIds.BSC_MAINNET,
    });

    await activate(walletConnectProvider);

    onWalletConnected?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dialogOptions: Partial<DialogProps> = React.useMemo(
    () =>
      isSmallScreen
        ? { fullScreen: true, TransitionComponent: Transition as any }
        : { maxWidth: 'xs', fullWidth: true },
    [isSmallScreen],
  );

  return (
    <Dialog {...dialogProps} {...dialogOptions}>
      <DialogTitleStyled>
        <Typography color='textPrimary' component='span' fontSize={18} fontWeight={700}>
          Connect Your Wallet
        </Typography>
        <CloseIconStyled>
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </CloseIconStyled>
      </DialogTitleStyled>
      <DialogContentStyled>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12} sm={6}>
            <LogoContainerPaper variant='elevation' elevation={4} onClick={onMetamaskWalletConnect}>
              <ConnectLogo
                src='https://assets.prod.euler.tools/connectors/metamask.svg'
                height={48}
                width={58}
                alt='metamask'
              />
              <Typography color='textPrimary' component='span' fontSize={18} fontWeight={700}>
                Metamask
              </Typography>
            </LogoContainerPaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LogoContainerPaper variant='elevation' elevation={4} onClick={onWalletConnectClick}>
              <ConnectLogo
                src='https://assets.prod.euler.tools/connectors/walletconnect.svg'
                height={48}
                width={58}
                alt='wallet-connect'
              />
              <Typography color='textPrimary' component='span' fontSize={18} fontWeight={700}>
                WalletConnect
              </Typography>
            </LogoContainerPaper>
          </Grid>
        </Grid>
      </DialogContentStyled>
    </Dialog>
  );
};

export default ConnectYourWallet;

// Styled components
const ConnectLogo = styled(Image)({
  marginBottom: '16px',
});

const LogoContainerPaper = styled(Paper)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  transition: 'transform 0.15s ease-in-out',

  '&:hover': {
    transform: 'scale3d(1.05, 1.05, 1)',
  },
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  minWidth: 350,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const DialogTitleStyled = styled(DialogTitle)({
  position: 'relative',
  textAlign: 'center',
});

const CloseIconStyled = styled(Box)({
  position: 'absolute',
  top: 4,
  right: 6,
});
