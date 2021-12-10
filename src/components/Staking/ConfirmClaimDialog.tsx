import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { EMetamaskErrors, IWeb3ContractsGrouped } from './shared';
import { styled } from '@mui/material/styles';

interface IProps extends DialogProps {
  onCancel: () => void;
  contractsInformation: IWeb3ContractsGrouped;
}

const ConfirmClaimDialog: React.FC<IProps> = ({ onCancel, contractsInformation, ...dialogProps }) => {
  // TODO account -> consume from unstoppable
  const account = '0xD00C43154d8962Ae6275f0BFc82F065a633B083B';

  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  const onClaimRewards = React.useCallback(async () => {
    try {
      setIsClaiming(true);

      await contractsInformation.staking.methods.claim().send({ from: account });

      onCancel();
    } catch (error) {
      let errorMessage = 'Unknown error, please try again.';

      if (error.code === EMetamaskErrors.USER_DENIED_TRANSACTION) {
        errorMessage = 'You cancelled the token claim';
      }

      console.log(errorMessage);
    } finally {
      setIsClaiming(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractsInformation]);

  return (
    <Dialog {...dialogProps} maxWidth='xs' fullWidth>
      <DialogTitleStyled>
        <Typography color='textPrimary' component='span' fontSize={18} fontWeight={700}>
          Claim EULER Rewards
        </Typography>
        <BoxWithCloseIcon>
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </BoxWithCloseIcon>
      </DialogTitleStyled>
      <DialogContent>
        <Typography color='textPrimary' variant='body2'>
          Remember that claiming your rewards will RESET the clock, locking your staked amount for another month.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button disabled={isClaiming} onClick={onCancel} color='primary' autoFocus>
          Cancel
        </Button>
        <Button disabled={isClaiming} onClick={onClaimRewards} color='primary'>
          CLAIM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmClaimDialog;

// Styled components
const DialogTitleStyled = styled(DialogTitle)({
  position: 'relative',
  textAlign: 'center',
});

const BoxWithCloseIcon = styled(Box)({
  position: 'absolute',
  top: 8,
  right: 8,
});
