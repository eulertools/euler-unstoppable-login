import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React, { FC } from 'react';
import StakingContent from 'components/Staking/Content';
import { pageview } from 'lib/gtag';
import Box from '@mui/material/Box';
import { withSessionSsr } from 'lib/ironSession';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WalletSelector from 'components/Staking/WalletSelector';
import ModalProvider from '_shared/modal';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const uauth = req.session.uauth;

  if (!uauth?.idToken?.sub) {
    return {
      redirect: {
        destination: '/?error=Unauthorized',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: uauth.idToken.sub,
      wallet: uauth.idToken.wallet_address,
    },
  };
});

interface IProps {
  user: string;
  wallet: string;
}

const StakingPage: FC<IProps> = ({ user }) => {
  React.useEffect(() => {
    pageview('/staking');
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ModalProvider>
        <Box p={4}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography pr={2} variant='largeBold'>
              Welcome {user}
            </Typography>
            <Box>
              <WalletSelector />
            </Box>
            <Button href='/api/auth/logout' rel='noopener noreferrer' size='small'>
              Logout
            </Button>
          </Box>
          <StakingContent />
        </Box>
      </ModalProvider>
    </Web3ReactProvider>
  );
};

export default StakingPage;
