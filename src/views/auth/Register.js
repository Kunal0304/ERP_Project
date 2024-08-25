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
import axiosInstance from 'axiosInstance'
// import { auth } from 'firebase.config';
// import { useState } from 'react';
// import firebase from "firebase/compat/app";

export default function Register() {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    // const [otpStatus, setOtpStatus] = useState(0)

    const navigate = useNavigate()

    const AuthWrapper = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.primary.light,
        minHeight: '100vh',
    }));

    // const handleSendOTP = (phoneNumber) => {
    //     if (phoneNumber.length != 13) {
    //         alert('Please enter valid phone number')
    //         return
    //     }

    //     window.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha', {
    //         size: 'invisible',
    //         callback: function () { },
    //     });

    //     // window.recaptchaVerifier.render();


    //     setOtpStatus(1)
    //     try {

    //         const appVerifier = window.recaptchaVerifier

    //         firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then((confirmationResult) => {
    //             window.confirmationResult = confirmationResult
    //             alert('OTP sent to ' + phoneNumber)
    //             setOtpStatus(2)
    //         }).catch((err) => {
    //             alert('Error while sending otp')
    //             console.log(err)
    //             setOtpStatus(0)
    //         })
    //     }
    //     catch {
    //         setOtpStatus(0)
    //     }
    // }

    // const verifyOTP = (otp) => {
    //     if (otp.toString().length != 6) {
    //         alert('Please enter valid OTP')
    //         return
    //     }

    //     let confirmationResult = window.confirmationResult;
    //     confirmationResult.confirm(otp).then((result) => {
    //         let user = result.user;
    //         setOtpStatus(3)
    //         console.log(user.uid)
    //     }).catch((err) => {
    //         alert('Invalid OTP')
    //         console.log(err)
    //     })
    // }

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
                                                <Link to="#">
                                                    <Logo />
                                                </Link>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                                                    <Grid item>
                                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                            <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                                Register an Account
                                                            </Typography>
                                                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                                                                Enter your details to create an account
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Formik
                                                    initialValues={{
                                                        firstName: '',
                                                        lastName: '',
                                                        email: '',
                                                        phoneNumber: '+91',
                                                        password: '',
                                                        // otp: '',
                                                        submit: null,
                                                    }}
                                                    onSubmit={async (values, { setErrors, setSubmitting }) => {
                                                        const request_data = {
                                                            'first_name': values.firstName,
                                                            'last_name': values.lastName,
                                                            'email': values.email,
                                                            'phone_number': values.phoneNumber,
                                                            'password': values.password,
                                                        }

                                                        try {
                                                            const response = await axiosInstance.post('/auth/user', request_data)
                                                            alert(response.data.message);
                                                            navigate('/')

                                                        } catch (error) {
                                                            if (error.response && error.response.status == 400) {
                                                                const response_data = error.response.data
                                                                const errors = {}
                                                                if (response_data.first_name) {
                                                                    errors.firstName = response_data.first_name[0]
                                                                }
                                                                if (response_data.last_name) {
                                                                    errors.lastName = response_data.last_name[0]
                                                                }
                                                                if (response_data.email) {
                                                                    errors.email = response_data.email[0]
                                                                }
                                                                if (response_data.phone_number) {
                                                                    errors.phoneNumber = response_data.phone_number[0]
                                                                }
                                                                if (response_data.password) {
                                                                    errors.password = response_data.password[0]
                                                                }
                                                                setErrors(errors)
                                                            }
                                                            setSubmitting(false)
                                                        }
                                                    }}
                                                >
                                                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                                        <form noValidate onSubmit={handleSubmit}>
                                                            <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel htmlFor="outlined-adornment-firstName-register">First Name</InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-firstName-register"
                                                                    type="text"
                                                                    value={values.firstName}
                                                                    name="firstName"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="First Name"
                                                                />
                                                                {touched.firstName && errors.firstName && (
                                                                    <FormHelperText error id="standard-weight-helper-text-firstName-register">
                                                                        {errors.firstName}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>

                                                            <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel htmlFor="outlined-adornment-lastName-register">Last Name</InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-lastName-register"
                                                                    type="text"
                                                                    value={values.lastName}
                                                                    name="lastName"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Last Name"
                                                                />
                                                                {touched.lastName && errors.lastName && (
                                                                    <FormHelperText error id="standard-weight-helper-text-lastName-register">
                                                                        {errors.lastName}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>

                                                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-email-register"
                                                                    type="email"
                                                                    value={values.email}
                                                                    name="email"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Email"
                                                                />
                                                                {touched.email && errors.email && (
                                                                    <FormHelperText error id="standard-weight-helper-text-email-register">
                                                                        {errors.email}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>

                                                            <FormControl fullWidth error={Boolean(touched.phoneNumber && errors.phoneNumber)} sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel htmlFor="outlined-adornment-phoneNumber-register">Phone Number</InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-phoneNumber-register"
                                                                    type="tel"
                                                                    value={values.phoneNumber}
                                                                    name="phoneNumber"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Phone Number"
                                                                    inputProps={{ maxLength: 13 }}
                                                                />
                                                                {touched.phoneNumber && errors.phoneNumber && (
                                                                    <FormHelperText error id="standard-weight-helper-text-phoneNumber-register">
                                                                        {errors.phoneNumber}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-password-register"
                                                                    type="password"
                                                                    value={values.password}
                                                                    name="password"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Password"
                                                                />
                                                                {touched.password && errors.password && (
                                                                    <FormHelperText error id="standard-weight-helper-text-password-register">
                                                                        {errors.password}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                            {/* 
                                                            <FormControl fullWidth error={Boolean(touched.otp && errors.otp)} sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel htmlFor="outlined-adornment-otp-register">OTP</InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-otp-register"
                                                                    type="number"
                                                                    value={values.otp}
                                                                    name="otp"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="OTP"
                                                                    disabled={otpStatus != 2}
                                                                    autoFocus={otpStatus == 2}
                                                                />
                                                                {touched.otp && errors.otp && (
                                                                    <FormHelperText error id="standard-weight-helper-text-otp-register">
                                                                        {errors.otp}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl> */}

                                                            {errors.submit && (
                                                                <Box sx={{ mt: 3 }}>
                                                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                                                </Box>
                                                            )}

                                                            <Box sx={{ mt: 2 }}>
                                                                <Grid container columnGap={2} justifyContent={'center'}>
                                                                    {/* <Grid item xs={5}>
                                                                        <AnimateButton>
                                                                            <Button onClick={() => {
                                                                                otpStatus == 2 ? verifyOTP(values.otp) : handleSendOTP(values.phoneNumber)
                                                                            }} disableElevation disabled={otpStatus == 1} fullWidth size="large" type="button" variant="contained" color="secondary">
                                                                                {
                                                                                    otpStatus == 0 ? 'Send OTP' : 'Verify OTP'
                                                                                }
                                                                            </Button>
                                                                        </AnimateButton>
                                                                    </Grid> */}
                                                                    <Grid item xs={5}>
                                                                        <AnimateButton>
                                                                            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                                                                                Register
                                                                            </Button>
                                                                        </AnimateButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </form>
                                                    )}
                                                </Formik>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid item container direction="column" alignItems="center" xs={12}>
                                                    <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                        Already have an account? Login here
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
















