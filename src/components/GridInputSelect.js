import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'

export default function GridInputSelect({ formik, name, options, label = null, required = false, autoFocus = false, md = 4, inputProps = {}, params = {} }) {
    label = label ? label : name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return (
        <>
            <Grid item md={md}>
                <FormControl fullWidth error={Boolean(formik.touched[name] && formik.errors[name])} required={required}>
                    <InputLabel htmlFor={`outlined-label-${name}`}>{label}</InputLabel>
                    <Select
                        id={`outlined-${name}`}
                        labelId={`outlined-label-${name}`}
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
                    >
                        {
                            options.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
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
