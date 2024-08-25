import { Box, FormControl, InputLabel, TextField } from '@mui/material'
import React from 'react'

export default function OtpInputBox({ otp_values, setFieldValue }) {
    return (
        <>
            <FormControl fullWidth margin='dense'>
                <InputLabel htmlFor="otp-input" shrink sx={{ fontSize: '20px' }}>
                    OTP
                </InputLabel>
                <Box display={'flex'} mt={1.5}>
                    {
                        otp_values.map((value, index) => (
                            <TextField
                                key={index}
                                type='text'
                                variant='outlined'
                                margin='dense'
                                value={value}
                                onChange={(e) => {
                                    const no = Number(e.target.value)

                                    if (no < 0 || no > 9 || isNaN(no))
                                        return

                                    const newValues = otp_values

                                    newValues[index] = no
                                    if (e.target.value.length == 0)
                                        newValues[index] = ''

                                    setFieldValue('otp_values', newValues)
                                    setFieldValue('otp', newValues.join(''))
                                }}

                                style={{ flex: 1, margin: '0 0.5em' }}

                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize: '16px',
                                    }
                                }}
                            />
                        ))
                    }
                </Box>
            </FormControl>
        </>
    )
}
