import * as React from 'react';
import { NextPage } from 'next';
import Container from '@mui/material/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AUTH_HANDLER_URL } from './api/auth/[...slug]';
import Image from 'next/image';
import Box from '@mui/material/Box';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { UnstoppableIcon } from '_shared/icons/unstoppable';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

const IndexPage: NextPage = () => {
  const router = useRouter();

  const onLoginWithUnstoppable = React.useCallback(async (values, { setSubmitting }) => {
    setSubmitting(true);

    setTimeout(() => {
      window.location.href = `${AUTH_HANDLER_URL}/login?login_hint=${encodeURIComponent(values.login_hint)}`;
    }, 150);
  }, []);

  return (
    <Container maxWidth='xs'>
      <Paper elevation={6} sx={{ marginTop: 4 }}>
        <Box p={4}>
          <Box mt={4} display='flex' justifyContent='center' alignItems='center'>
            <Image alt='euler-logo' src='/assets/eulerLogo.png' height={84} width={84} />
            <CompareArrowsIcon fontSize='large' />
            <UnstoppableIcon width={100} height={74} />
          </Box>
          <Formik
            validateOnChange={false}
            initialValues={{ login_hint: '' } as { login_hint: string }}
            validationSchema={Yup.object().shape({
              login_hint: Yup.string()
                .required('Username is required')
                .matches(
                  /^([a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.)(x|crypto|coin|wallet|bitcoin|888|nft|dao|blockchain)$/,
                  'Input is not a valid Unstoppable username',
                ),
            })}
            onSubmit={onLoginWithUnstoppable}
          >
            {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }): JSX.Element => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container mt={4}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size='small'
                      onFocus={event => {
                        event.target.select();
                      }}
                      error={Boolean(touched.login_hint && errors.login_hint)}
                      helperText={touched.login_hint && errors.login_hint}
                      value={values.login_hint}
                      onChange={handleChange}
                      margin='normal'
                      name='login_hint'
                      id='username-input'
                      variant='outlined'
                      style={{ margin: 0 }}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} mt={3}>
                    <Button
                      fullWidth
                      color='primary'
                      disabled={!values.login_hint || isSubmitting}
                      size='large'
                      type='submit'
                      variant='contained'
                    >
                      LOGIN WITH UNSTOPPABLE
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          {router?.query?.error ? (
            <Typography pt={4} variant='caption' color='red'>
              {router?.query?.error}
            </Typography>
          ) : null}
        </Box>
      </Paper>
    </Container>
  );
};

export default IndexPage;
