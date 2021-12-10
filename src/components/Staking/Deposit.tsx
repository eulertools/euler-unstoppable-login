import BigNumber from 'bignumber.js';
import { Formik } from 'formik';
import Web3 from 'web3';
import * as Yup from 'yup';
import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { eulerConfig } from './config';
import { DEFAULT_LABEL, EMetamaskErrors, IWeb3ContractsGrouped, VERY_BIG_UINT256 } from './shared';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { getBigNumberCurrencyLabel } from 'lib/bigNumber';
import { styled, useTheme } from '@mui/material/styles';

interface IProps {
  eulerWalletBalance: BigNumber | typeof DEFAULT_LABEL;
  eulerUSDPrice: BigNumber;
  contractsInformation?: IWeb3ContractsGrouped;
  web3: Web3;
}

function StakeForm(props: IProps): JSX.Element {
  const theme = useTheme();

  // Consume from unstoppable login
  const account = '0xD00C43154d8962Ae6275f0BFc82F065a633B083B';
  const isMountedRef = useIsMountedRef();

  const { eulerWalletBalance, eulerUSDPrice, contractsInformation, web3 } = props;

  const onStake = React.useCallback(
    // eslint-disable-next-line consistent-return
    async (values, { setStatus, setSubmitting, resetForm }): Promise<void> => {
      // Approve staking contract to manage your Euler
      if (contractsInformation?.allowance.isZero()) {
        try {
          await contractsInformation?.token?.methods
            .approve(eulerConfig.stakingContract, VERY_BIG_UINT256)
            .send({ from: account });
        } catch (error) {
          let errorMessage = 'Unknown error, please try again.';

          if (error.code === EMetamaskErrors.USER_DENIED_TRANSACTION) {
            errorMessage = 'You need to approve Euler to be able to stake';
          }

          console.error(errorMessage);
        }

        // Check if current allowance is smaller than what the user wants to stake
      } else if (contractsInformation?.allowance.isLessThan(new BigNumber(values.stakeInput))) {
        try {
          await contractsInformation?.token?.methods
            .increaseAllowance(eulerConfig.stakingContract, VERY_BIG_UINT256)
            .send({ from: account });
        } catch (error) {
          let errorMessage = 'Unknown error, please try again.';

          if (error.code === EMetamaskErrors.USER_DENIED_TRANSACTION) {
            errorMessage = 'You need to re-approve Euler to be able to stake again';
          }

          console.error(errorMessage);
        }
      }

      // Stake
      try {
        // Convert user input to uint256
        const amount = web3.utils.toWei(values.stakeInput, 'ether');

        await contractsInformation?.staking.methods.deposit(amount).send({ from: account });
      } catch (error) {
        let errorMessage = 'Unknown error, please try again.';

        if (error.code === EMetamaskErrors.USER_DENIED_TRANSACTION) {
          errorMessage = 'You cancelled the stake transaction';
        }

        if (error.code === EMetamaskErrors.INTERNAL_JSON_RPC_ERROR) {
          if (error.data?.message?.contains('invalid deposit amount')) {
            errorMessage = 'You either tried to stake more than what you have or less than the minimum (4000 EULER)';
          }
        }

        console.error(errorMessage);
      }

      if (isMountedRef.current) {
        setStatus({ success: true });
        setSubmitting(false);
        resetForm({});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contractsInformation, web3],
  );

  const alreadyStaking = contractsInformation?.userInfo?.amount !== '0';
  const minDepositNumber = contractsInformation?.minDepositAmount?.toString();

  return (
    <>
      <Typography color='textPrimary' variant='h6' marginBottom={1}>
        Your $EULER Balance
      </Typography>
      <Typography color='textPrimary' variant='h5'>
        {getBigNumberCurrencyLabel(eulerWalletBalance)}{' '}
      </Typography>
      {eulerWalletBalance !== DEFAULT_LABEL ? (
        <Typography color='textSecondary' variant='overline'>
          {eulerUSDPrice
            ? getBigNumberCurrencyLabel(eulerUSDPrice.multipliedBy(eulerWalletBalance), false, 4)
            : DEFAULT_LABEL}{' '}
          USD
        </Typography>
      ) : null}
      <Formik
        validateOnBlur
        validateOnChange={false}
        initialValues={{ stakeInput: 0 } as { stakeInput: number }}
        validationSchema={Yup.object().shape({
          stakeInput: Yup.number()
            .required('Value is required')
            .min(
              alreadyStaking ? 0 : Number(minDepositNumber),
              `Minimum stake amount is set to ${alreadyStaking ? '0' : minDepositNumber} EULER`,
            )
            // .max(eulerWalletBalance as number, 'Your wallet does not hold that many tokens')
            .typeError('Must be a number'),
        })}
        onSubmit={onStake}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
          setFieldTouched,
          handleBlur,
        }): JSX.Element => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} alignItems='flex-start' marginTop={1}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size='small'
                  onFocus={event => {
                    event.target.select();
                  }}
                  error={Boolean(touched.stakeInput && errors.stakeInput)}
                  helperText={touched.stakeInput && errors.stakeInput}
                  value={values.stakeInput}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='stakeInput'
                  id='euler-stake-input'
                  variant='outlined'
                  style={{ margin: 0 }}
                  InputProps={{
                    sx: {
                      background: theme.palette.background.default,
                      borderRadius: theme.spacing(2),
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                    },
                    endAdornment: (
                      <Button
                        onClick={() => {
                          setFieldValue('stakeInput', eulerWalletBalance.toString());
                          setFieldTouched('stakeInput', true, false);
                        }}
                        size='small'
                        color='primary'
                        disabled={isSubmitting}
                      >
                        MAX
                      </Button>
                    ),
                  }}
                  disabled={isSubmitting}
                  FormHelperTextProps={{
                    sx: {
                      position: 'absolute',
                      bottom: theme.spacing(-3),
                      minWidth: 350,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ButtonStyled color='primary' disabled={isSubmitting} size='large' type='submit' variant='contained'>
                  {contractsInformation?.allowance.isZero() ? 'APPROVE' : 'STAKE'}
                </ButtonStyled>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

export default StakeForm;

// Styles Components
const ButtonStyled = styled(Button)(props => ({
  padding: props.theme.spacing(0.75, 3),
}));
