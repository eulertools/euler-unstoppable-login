import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { eulerConfig } from './config';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { uint256ToDecimalBn } from 'lib/bigNumber';
import AirdropContent from './Airdrop';
import StakingEarned from './Claim';
import StakeForm from './Deposit';
import StakingHeader from './Header';
import UnstakeForm from './Withdraw';
import { DEFAULT_LABEL, IPoolInfo, IGetUserInfo, IWeb3ContractsGrouped } from './shared';
import { CustomAlert } from '_shared/alerts/CustomAlert';
import { eulerTokenABI } from './euler_token_abi';
import { eulerStakingABI } from './euler_staking_abi';
import { styled } from '@mui/material/styles';
import { secureLoader } from 'lib/api';
import { ITokenPriceDTO, TOKENS_HANDLER_URL } from 'pages/api/tokens/[...slug]';
import useSWR from 'swr';

function StakingContent(): JSX.Element {
  const { account, active, library, chainId } = useWeb3React();

  const isMountedRef = useIsMountedRef();

  const { data: eulerPriceData } = useSWR<ITokenPriceDTO>(
    `${TOKENS_HANDLER_URL}/${eulerConfig.tokenContract}`,
    secureLoader(),
  );

  const [eulerWalletBalance, setEulerWalletBalance] = useState<BigNumber | typeof DEFAULT_LABEL>(DEFAULT_LABEL);
  const [contractsInstances, setContractsInstances] = useState<{
    tokenContractInstance: any;
    stakingContractInstance: any;
  }>(null);
  const [contractsInformation, setContractsInformation] = useState<IWeb3ContractsGrouped>(null);
  const web3 = React.useRef(null);

  React.useEffect(() => {
    if (!account) {
      setEulerWalletBalance(DEFAULT_LABEL);
      // If we already have info, reuse
      if (contractsInformation?.allowance) {
        setContractsInformation(cur => ({ ...(cur || ({} as any)), userInfo: null }));
      } else {
        setContractsInformation(null);
      }

      return () => {};
    }

    if (contractsInstances /*&& chainId === eulerConfig.chainID*/) {
      const getStakingInformation = async () => {
        // Check if connected wallet already has approved EULER staking to manage your tokens
        // for this use the allowance method: allowance(owner, spender) and also get the user
        // and pool information
        try {
          const [
            allowanceAmount,
            userEulerBalance,
            poolInfo,
            userInfo,
            minDepositAmount,
            totalUsersStaking,
          ] = await Promise.all<string, string, IPoolInfo, IGetUserInfo, string, string>([
            contractsInstances.tokenContractInstance.methods
              .allowance(account, eulerConfig.stakingContract)
              .call({ from: account }),
            contractsInstances.tokenContractInstance.methods.balanceOf(account).call({ from: account }),
            contractsInstances.stakingContractInstance.methods.poolInfo().call({ from: account }),
            contractsInstances.stakingContractInstance.methods.getUserInfo(account).call({ from: account }),
            contractsInstances.stakingContractInstance.methods.minDepositAmount().call({ from: account }),
            contractsInstances.stakingContractInstance.methods.getTotalUsers().call({ from: account }),
          ]);

          const allowance = uint256ToDecimalBn(allowanceAmount);

          if (isMountedRef) {
            setEulerWalletBalance(uint256ToDecimalBn(userEulerBalance || 0));
            setContractsInformation({
              allowance,
              poolInfo,
              userInfo,
              totalUsersStaking,
              minDepositAmount: uint256ToDecimalBn(minDepositAmount),
              token: contractsInstances.tokenContractInstance,
              staking: contractsInstances.stakingContractInstance,
            });
          }
        } catch (error) {
          console.error(error);
        }
      };

      getStakingInformation();

      const pollStakingInterval = setInterval(() => {
        getStakingInformation();
      }, 6000);

      return () => clearInterval(pollStakingInterval);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractsInstances, account, chainId]);

  React.useEffect(() => {
    // Only instance and get the ABIs once
    if (!contractsInstances && active) {
      const getContractsInstances = async () => {
        // Create the web3 instance with the initialized provider
        web3.current = new Web3(library.provider);

        // Create the Euler Contract instance that will be used first to approve the address for staking
        const tokenContractInstance = new web3.current.eth.Contract(eulerTokenABI.abi, eulerConfig.tokenContract);
        // Create the Euler Staking Contract instance
        const stakingContractInstance = new web3.current.eth.Contract(eulerStakingABI.abi, eulerConfig.stakingContract);

        // Make contracts return the revert reason
        // TODO not working in web3 more info: https://github.com/ChainSafe/web3.js/issues/3742
        // enable when solved
        // contractInstance.handleRevert = true;
        // stakingContractInstance.handleRevert = true;

        if (isMountedRef) {
          setContractsInstances({
            tokenContractInstance,
            stakingContractInstance,
          });
        }
      };

      getContractsInstances();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const eulerUSDPrice = new BigNumber(eulerPriceData?._source?.price_usd ?? 0);

  return (
    <>
      {account && chainId !== eulerConfig.chainID ? (
        <Box mt={2}>
          <CustomAlert
            severity='warning'
            message={
              <Box>
                <Typography>
                  Staking is only possible in the BSC network. Please switch your wallet and/or Euler.tools application
                  network selector to BSC.
                </Typography>
              </Box>
            }
            customIcon
          />
        </Box>
      ) : null}
      <AirdropContent contractsInformation={contractsInformation} />
      <Box>
        <Grid container marginTop={1} spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeaderStyled
                title={<StakingHeader eulerUSDPrice={eulerUSDPrice} contractsInformation={contractsInformation} />}
              />
              <CardContent>
                <Grid container pb={1} rowGap={2}>
                  <Grid item xs={12} md={4} display='flex' flexDirection='column' justifyContent='space-between'>
                    <StakeForm
                      eulerUSDPrice={eulerUSDPrice}
                      eulerWalletBalance={eulerWalletBalance}
                      contractsInformation={contractsInformation}
                      web3={web3.current}
                    />
                  </Grid>
                  <DividerGrid />
                  <Grid item xs={12} md={4} display='flex' flexDirection='column' justifyContent='space-between'>
                    <UnstakeForm
                      eulerUSDPrice={eulerUSDPrice}
                      contractsInformation={contractsInformation}
                      web3={web3.current}
                    />
                  </Grid>
                  <DividerGrid />
                  <Grid item xs={12} md={2} display='flex' flexDirection='column' justifyContent='space-between'>
                    <StakingEarned eulerUSDPrice={eulerUSDPrice} contractsInformation={contractsInformation} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={2}>
          <CustomAlert
            severity='info'
            message={
              <Box>
                <Typography>
                  Restaking does not require any minimum amount but it will reset the 30-day timer.
                </Typography>
                {chainId === eulerConfig.chainID ? null : (
                  <Typography>If you really want to stake, you will need to switch to the correct network.</Typography>
                )}
              </Box>
            }
            customIcon
          />
        </Box>
        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Link
            href='https://github.com/Quillhash/Audit_Reports/blob/master/Euler%20Staking%20Smart%20Contract%20Audit%20Report%20-%20QuillAudits.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image width={144} height={60} src='/assets/quillAuditedBadgeWhite.png' alt='quill-badge' />
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default StakingContent;

const DividerGrid = () => (
  <Hidden mdDown>
    <Grid item xs={false} md={1} display='flex' alignItems='center' justifyContent='center'>
      <Divider orientation='vertical' style={{ height: '100px' }} />
    </Grid>
  </Hidden>
);

// Styled components
const CardHeaderStyled = styled(CardHeader)({
  paddingRight: 0,
});
