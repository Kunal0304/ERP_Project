import { FormControl, FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react'

export default function GridInput({ formik, name, label = null, type = 'text', required = false, autoFocus = false, md = 4, inputProps = {}, params = {} }) {
    label = label ? label : name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return (
        <>
            <Grid item md={md}>
                <FormControl fullWidth error={Boolean(formik.touched[name] && formik.errors[name])} required={required}>
                    <InputLabel htmlFor={`outlined-label-${name}`}>{label}</InputLabel>
                    <OutlinedInput
                        id={`outlined-${name}`}
                        type={type}
                        value={name.split('.').reduce((obj, key) => obj[key], formik.values)}
                        name={name}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                            formik.setFieldValue(name, e.target.value)
                        }}
                        label={label}
                        autoFocus={autoFocus}
                        inputProps={inputProps}
                        {...params}
                    />
                    {formik.touched[name] && formik.errors[name] && (
                        <FormHelperText error id={`standard-weight-helper-text-${name}`}>
                            {formik.errors[name]}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
        </>
    )
}
