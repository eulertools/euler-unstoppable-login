import BigNumber from 'bignumber.js';
import { Formik } from 'formik';
import Web3 from 'web3';
import * as Yup from 'yup';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { DEFAULT_LABEL, EMetamaskErrors, EULER_AIRDROP_MIN, IWeb3ContractsGrouped } from './shared';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { uint256ToDecimalBn, getBigNumberCurrencyLabel } from 'lib/bigNumber';

interface IProps {
  eulerUSDPrice: BigNumber;
  contractsInformation: IWeb3ContractsGrouped;
  web3: Web3;
}

function UnstakeForm(props: IProps): JSX.Element {
  // Consume from unstoppable login
  const account = '0xD00C43154d8962Ae6275f0BFc82F065a633B083B';

  const theme = useTheme();
  const isMountedRef = useIsMountedRef();

  const { eulerUSDPrice, contractsInformation, web3 } = props;

  const onUnstake = React.useCallback(
    async (values, { setStatus, setSubmitting, resetForm }) => {
      // Stake
      try {
        // Convert user input to uint256
        const amount = web3.utils.toWei(new BigNumber(values.unstakeInput).toString(), 'ether');

        await contractsInformation?.staking.methods.withdraw(amount).send({ from: account });

        resetForm();
      } catch (error) {
        let errorMessage = 'Unknown error, please try again.';

        if (error.code === EMetamaskErrors.USER_DENIED_TRANSACTION) {
          errorMessage = 'You cancelled the unstake';
        }

        console.error(errorMessage);
      }

      if (isMountedRef.current) {
        setStatus({ success: true });
        setSubmitting(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contractsInformation, web3],
  );

  const eulerStaked = contractsInformation?.userInfo?.amount || DEFAULT_LABEL;
  const bnEulerStaked = uint256ToDecimalBn(eulerStaked);
  const [formattedEulerStaked, eligibleForAirdrop] = React.useMemo(
    () =>
      eulerStaked !== DEFAULT_LABEL
        ? [bnEulerStaked.toString(), bnEulerStaked.isGreaterThanOrEqualTo(EULER_AIRDROP_MIN)]
        : [DEFAULT_LABEL, false],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eulerStaked],
  );

  const disableButton = eulerStaked === DEFAULT_LABEL || formattedEulerStaked === '0' || !account;

  return (
    <>
      <Box>
        <Typography
          color={eligibleForAirdrop ? theme.palette.success.main : 'textPrimary'}
          variant='h6'
          marginBottom={1}
        >
          {eligibleForAirdrop ? '$EULER Staked (Airdrop Eligible)' : '$EULER Staked'}
        </Typography>
        <Typography color={eligibleForAirdrop ? theme.palette.success.main : 'textPrimary'} variant='h5'>
          {getBigNumberCurrencyLabel(formattedEulerStaked)}
        </Typography>
        {eulerStaked !== DEFAULT_LABEL ? (
          <Typography color='textSecondary' variant='overline'>
            {eulerUSDPrice
              ? getBigNumberCurrencyLabel(eulerUSDPrice.multipliedBy(formattedEulerStaked), false, 4)
              : DEFAULT_LABEL}{' '}
            USD
          </Typography>
        ) : null}
      </Box>
      <Formik
        validateOnChange={false}
        initialValues={{ unstakeInput: 0 } as { unstakeInput: number }}
        validationSchema={Yup.object().shape({
          unstakeInput: Yup.number()
            .required('Value is required')
            .min(0.00000000000000001, 'Minimum unstake is set to 1 wei')
            .max(+formattedEulerStaked, 'Unstake amount is higher than the available')
            .typeError('Must be a number'),
        })}
        onSubmit={onUnstake}
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
        }): JSX.Element => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} display='flex' alignItems='flex-start' marginTop={1}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size='small'
                  onFocus={event => {
                    event.target.select();
                  }}
                  error={Boolean(touched.unstakeInput && errors.unstakeInput)}
                  helperText={touched.unstakeInput && errors.unstakeInput}
                  value={values.unstakeInput}
                  onChange={handleChange}
                  margin='normal'
                  name='unstakeInput'
                  id='euler-unstake-input'
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
                          setFieldValue('unstakeInput', formattedEulerStaked);
                          setFieldTouched('unstakeInput', true, false);
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
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  sx={{ padding: theme.spacing(0.75, 3) }}
                  color='primary'
                  disabled={disableButton || !values.unstakeInput || isSubmitting}
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  UNSTAKE
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

export default UnstakeForm;
