import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import MainCard from 'ui-component/cards/MainCard';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { styled } from '@mui/material/styles';
import { auth } from 'firebase.config';
import firebase from "firebase/compat/app";
import { useEffect } from 'react';
import axiosInstance from 'axiosInstance'
import OtpInputBox from 'components/OtpInputBox';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function Login() {
    const theme = useTheme();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate()

    const AuthWrapper = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.primary.light,
        minHeight: '100vh',
    }));

    useEffect(() => {
        if (window.recaptchaVerifier)
            return

        window.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha', {
            size: 'invisible',
            callback: function () { },
        });

        window.recaptchaVerifier.render();

        return () => {
            const recaptcha = document.getElementById('recaptcha')
            if (recaptcha) {
                document.body.removeChild(recaptcha)
                const newRecaptcha = document.createElement('div')
                newRecaptcha.id = 'recaptcha'
                document.body.appendChild(newRecaptcha)
                delete window.recaptchaVerifier
            }
        }
    }, [])

    const [timer, setTimer] = useState(10)

    const countDown = () => {
        const updateTimer = () => {
            setTimer(timer - 1)

            if (timer < 0) {
                clearInterval(interval)
            }
        }

        updateTimer()
        const interval = setInterval(updateTimer, 1000)
    }

    console.log('timer', timer)
    countDown && countDown

    return (
        <>
            <AuthWrapper>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <MainCard
                                    sx={{
                                        maxWidth: { xs: 400, lg: 475 },
                                        margin: { xs: 2.5, md: 3 },
                                        '& > *': {
                                            flexGrow: 1,
                                            flexBasis: '50%',
                                        },
                                    }}
                                    content={false}
                                >
                                    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                                            <Grid item sx={{ mb: 3 }}>
                                                <Link to="/">
                                                    <Logo />
                                                </Link>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                                                    <Grid item>
                                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                            <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                                Hi, Welcome Back
                                                            </Typography>
                                                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                                                                Enter your credentials to continue
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Formik
                                                    initialValues={{
                                                        phone_number: '+91',
                                                        otp: '',
                                                        otp_button_status: false,
                                                        login_button_status: true,
                                                        submit: null,
                                                        otp_numbers: ['', '', '', '', '', '']
                                                    }}
                                                    // onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                    onSubmit={async (values, { setErrors, setFieldValue }) => {
                                                        setFieldValue('login_button_status', true)
                                                        if (values.otp.toString().length != 6) {
                                                            setErrors({
                                                                'otp': 'Please enter valid OTP'
                                                            })
                                                            setFieldValue('login_button_status', false)
                                                            return
                                                        }

                                                        let confirmationResult = window.confirmationResult;
                                                        await confirmationResult.confirm(values.otp).then(async (result) => {
                                                            let user = result.user;
                                                            const request_data = {
                                                                'phone_number': values.phone_number,
                                                                'uid': user.uid,
                                                            }
                                                            try {
                                                                const response = await axiosInstance.post('/auth/login', request_data)
                                                                toast.success(response.data.message);
                                                                localStorage.setItem("token", response.data.token)
                                                                navigate('/')
                                                            } catch (error) {
                                                                // console.log(error)
                                                                // if (error.response && error.response.status == 400) {
                                                                //     const response_data = error.response.data
                                                                //     const errors = {}
                                                                //     if (response_data.phone_number) {
                                                                //         errors.phone_number = response_data.phone_number[0]
                                                                //     }
                                                                //     setErrors(errors)
                                                                // }
                                                                if (error.response && error.response.status == 400) {
                                                                    const response_data = error.response.data
                                                                    const errors = {}

                                                                    Object.keys(response_data).forEach((field) => {
                                                                        errors[field] = response_data[field][0];
                                                                        toast.error(response_data[field][0])
                                                                    });

                                                                    console.log(errors)
                                                                    setErrors(errors)
                                                                }
                                                                setFieldValue('login_button_status', false)
                                                            }
                                                        }).catch(() => {
                                                            toast.error('Invalid OTP')
                                                            setFieldValue('login_button_status', false)
                                                        })
                                                    }}
                                                >
                                                    {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
                                                        <form noValidate onSubmit={handleSubmit}>
                                                            <FormControl fullWidth error={Boolean(touched.phone_number && errors.phone_number)} sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel htmlFor="outlined-adornment-phone_number-login">Phone Number</InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-phone_number-login"
                                                                    type="tel"
                                                                    value={values.phone_number}
                                                                    name="phone_number"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Phone Number"
                                                                    inputProps={{ maxLength: 13 }}
                                                                />
                                                                {touched.phone_number && errors.phone_number && (
                                                                    <FormHelperText error id="standard-weight-helper-text-phone_number-login">
                                                                        {errors.phone_number}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>

                                                            <FormControl fullWidth error={Boolean(touched.otp && errors.otp)} sx={{ ...theme.typography.customInput }} style={{ display: 'none' }}>
                                                                <InputLabel htmlFor="outlined-adornment-otp-register">OTP</InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-otp-register"
                                                                    type="number"
                                                                    value={values.otp}
                                                                    name="otp"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="otp"
                                                                />
                                                                {touched.otp && errors.otp && (
                                                                    <FormHelperText error id="standard-weight-helper-text-otp-register">
                                                                        {errors.otp}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                            <OtpInputBox otp_values={values.otp_numbers} setFieldValue={setFieldValue} />

                                                            {errors.submit && (
                                                                <Box sx={{ mt: 3 }}>
                                                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                                                </Box>
                                                            )}

                                                            <Box sx={{ mt: 2 }}>
                                                                <Grid container columnGap={2} justifyContent={'center'}>
                                                                    <Grid item xs={5}>
                                                                        <AnimateButton>
                                                                            <Button disableElevation onClick={
                                                                                () => {
                                                                                    if (values.phone_number.length != 13) {
                                                                                        toast.error('Please enter valid phone number')
                                                                                        return
                                                                                    }

                                                                                    setFieldValue('otp_button_status', true)

                                                                                    try {

                                                                                        const appVerifier = window.recaptchaVerifier

                                                                                        firebase.auth().signInWithPhoneNumber(values.phone_number, appVerifier).then((confirmationResult) => {
                                                                                            window.confirmationResult = confirmationResult
                                                                                            toast.success('OTP sent to ' + values.phone_number)
                                                                                            setFieldValue('login_button_status', false)
                                                                                        }).catch((err) => {
                                                                                            toast.error('Error while sending otp')
                                                                                            console.log(err)
                                                                                            setFieldValue('otp_button_status', false)
                                                                                            setFieldValue('login_button_status', true)
                                                                                            setTimer(10)
                                                                                        })
                                                                                    }
                                                                                    catch {
                                                                                        setFieldValue('otp_button_status', false)
                                                                                        setFieldValue('login_button_status', true)
                                                                                        setTimer(10)
                                                                                    }
                                                                                }
                                                                            } fullWidth size="large" type="button" variant="contained" color="secondary">
                                                                                {
                                                                                    !values.otp_button_status ? 'Send OTP' : 'Resend OTP'
                                                                                }
                                                                            </Button>
                                                                        </AnimateButton>
                                                                    </Grid>
                                                                    <Grid item xs={5}>
                                                                        <AnimateButton>
                                                                            <Button disableElevation disabled={values.login_button_status} fullWidth size="large" type="submit" variant="contained" color="secondary">
                                                                                Login
                                                                            </Button>
                                                                        </AnimateButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                            {/* <Box sx={{ mt: 2 }}>
                                                                <AnimateButton>
                                                                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                                                                        Sign in
                                                                    </Button>
                                                                </AnimateButton>
                                                            </Box> */}
                                                        </form>
                                                    )}
                                                </Formik>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid item container direction="column" alignItems="center" xs={12}>
                                                    <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                        Don&apos;t have an account?
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid>
                </Grid>
            </AuthWrapper>
        </>
    );
}