import BigNumber from 'bignumber.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ConfirmClaimDialog from './ConfirmClaimDialog';
import { DEFAULT_LABEL, IWeb3ContractsGrouped } from './shared';
import { useModal } from '_shared/modal';
import { getBigNumberCurrencyLabel, uint256ToBNBCurrency } from 'lib/bigNumber';
import { useTheme } from '@mui/material/styles';

interface IProps {
  eulerUSDPrice: BigNumber;
  contractsInformation: IWeb3ContractsGrouped;
}

function StakingEarned(props: IProps): JSX.Element {
  const theme = useTheme();
  const { showModal } = useModal();

  const { eulerUSDPrice, contractsInformation } = props;

  function onClaimRewards() {
    const unlinkPrimaryWalletModal = showModal(ConfirmClaimDialog, {
      contractsInformation,
      onCancel: () => {
        unlinkPrimaryWalletModal.hide();
      },
    });
  }

  const pendingRewards = contractsInformation?.userInfo?.pendingRewards || DEFAULT_LABEL;
  const disableButton = pendingRewards === DEFAULT_LABEL || (pendingRewards as string) === '0';

  return (
    <>
      <Box>
        <Typography color='textPrimary' variant='h6' marginBottom={1}>
          $EULER Earned
        </Typography>
        <Typography color='textPrimary' variant='h5'>
          {getBigNumberCurrencyLabel(pendingRewards, true, 4)}
        </Typography>
        {pendingRewards !== DEFAULT_LABEL && pendingRewards !== '0' ? (
          <Typography color='textSecondary' variant='overline'>
            {eulerUSDPrice
              ? getBigNumberCurrencyLabel(eulerUSDPrice.multipliedBy(uint256ToBNBCurrency(pendingRewards)), false, 4)
              : DEFAULT_LABEL}{' '}
            USD
          </Typography>
        ) : null}
      </Box>
      <Grid container spacing={3} display='flex' alignItems='center' marginTop={1}>
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Button
            disabled={disableButton}
            sx={{ padding: theme.spacing(0.75, 3) }}
            color='primary'
            size='large'
            onClick={onClaimRewards}
            variant='contained'
          >
            CLAIM
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default StakingEarned;
