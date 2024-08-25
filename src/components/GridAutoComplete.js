import { Autocomplete, FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import React from 'react'

export default function GridAutoComplete({ formik, name, options, getOptionLabel, getValue, onChange, label = null, md = 4, required = false, autoFocus = false }) {
    label = label ? label : name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return (
        <>
            <Grid item md={md}>
                <FormControl fullWidth error={Boolean(formik.touched[name] && formik.errors[name])}>
                    <Autocomplete
                        options={options}
                        getOptionLabel={getOptionLabel}
                        renderInput={(params) => <TextField label={label} variant="outlined" {...params} required={required} autoFocus={autoFocus} />}
                        value={getValue}
                        onChange={onChange}
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
