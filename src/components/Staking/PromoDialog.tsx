import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { CustomCheckbox } from '_shared/checkbox';

export const DISMISS_LOCALSTORAGE_KEY = 'staking-dismiss';

interface IProps extends DialogProps {
  onClose: () => void;
  airdropEligible: boolean;
}

const PromoDialog: React.FC<IProps> = ({ onClose, airdropEligible, ...rest }) => {
  const [dismissDialog, setDismissDialog] = React.useState<boolean>(false);

  function onCloseDialog() {
    onClose();
  }

  function toggleCheckbox() {
    setDismissDialog(cur => !cur);
  }

  function handleDismissDialog() {
    if (dismissDialog) {
      localStorage.setItem(DISMISS_LOCALSTORAGE_KEY, 'true');
    }

    onCloseDialog();
  }

  return (
    <Dialog
      {...rest}
      onClose={onCloseDialog}
      maxWidth='sm'
      aria-labelledby='promo-dialog-title'
      aria-describedby='promo-dialog-description'
      fullWidth
    >
      <DialogTitle color='textPrimary' id='promo-dialog-title'>
        <Title fontWeight={700}>Stake & Earn</Title>
      </DialogTitle>
      <DialogContent id='promo-dialog-description'>
        <DialogContentText>
          <DescriptionHeader component='span' color='textPrimary' fontWeight={700}>
            Put your $EULER to work and earn rewards
          </DescriptionHeader>
        </DialogContentText>
        <DialogContentText color='textPrimary'>
          Every 16th of the month, 150k $EULER airdrop will be shared amongst the wallets that stake 40k+ tokens. All
          you need to do is to stake before the 15th of the month at 23:59:59 UTC.
        </DialogContentText>
      </DialogContent>
      <DialogActionsStyled>
        <CloseButton variant='contained' onClick={handleDismissDialog} color='primary'>
          {airdropEligible ? 'Close' : 'Start Staking'}
        </CloseButton>
        <Box display='flex' alignItems='center' onClick={toggleCheckbox}>
          <CustomCheckbox checked={dismissDialog} />
          <PointerStyled color='textSecondary' variant='caption'>
            Never show this dialog again
          </PointerStyled>
        </Box>
      </DialogActionsStyled>
    </Dialog>
  );
};

export default PromoDialog;

// Styled Components
const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: theme.typography.h2.fontSize,
}));

type CustomComponentType = React.ComponentType<TypographyProps<'span', { component: 'span' }>>;

const DescriptionHeader: CustomComponentType = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
}));

const DialogActionsStyled = styled(DialogActions)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const PointerStyled = styled(Typography)({
  cursor: 'pointer',
});

const CloseButton = styled(Button)({
  minWidth: 160,
});
