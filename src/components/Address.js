// import { Autocomplete, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axiosInstance from 'axiosInstance'

// export default function Address({ formik }) {
//     const [countries, setCountries] = useState([])
//     const [states, setStates] = useState([])

//     useEffect(() => {
//         axiosInstance.get('/company/country/').then((response) => {
//             setCountries(response.data)
//         })

//     }, [])

//     const dc = countries.find(country => country.name == 'India')?.id

//     dc && states.length == 0 && axiosInstance.get(`/company/country/${dc}/`).then((response) => {
//         setStates(response.data.states)
//         formik.setFieldValue('state', response.data.states.find(state => state.name == 'Gujarat')?.id || '')
//         formik.setFieldValue('country', countries.find(country => country.name == 'India')?.id || '')
//     })


//     // axiosInstance.get(`/company/country/${company.country}/`).then((response) => {
//     //     setStates(response.data.states)
//     // })

//     return (
//         <>
//             <Grid key={'0-0'} item md={6} >
//                 <FormControl fullWidth >
//                     <InputLabel htmlFor={'outlined-label-address'}>Address</InputLabel>
//                     <OutlinedInput
//                         id={'outlined-address'}
//                         type={'text'}
//                         value={formik.values.address}
//                         name={'address'}
//                         onBlur={formik.handleBlur}
//                         onChange={formik.handleChange}
//                         label={'Address'}
//                         multiline={true}
//                         rows={3}
//                     />
//                     {
//                         formik.touched.address && formik.errors.address && (
//                             <FormHelperText error id={'standard-weight-helper-text-address'}>
//                                 {formik.errors.address}
//                             </FormHelperText>
//                         )
//                     }
//                 </FormControl>
//             </Grid>

//             <Grid key={'0-1'} item md={6} >
//                 <FormControl fullWidth >
//                     <InputLabel htmlFor={'outlined-label-city'}>City</InputLabel>
//                     <OutlinedInput
//                         id={'outlined-city'}
//                         type={'text'}
//                         value={formik.values.city}
//                         name={'city'}
//                         onBlur={formik.handleBlur}
//                         onChange={formik.handleChange}
//                         label={'City'}
//                     />
//                     {
//                         formik.touched.city && formik.errors.city && (
//                             <FormHelperText error id={'standard-weight-helper-text-city'}>
//                                 {formik.errors.city}
//                             </FormHelperText>
//                         )
//                     }
//                 </FormControl>
//             </Grid>

//             <Grid key={'0-2'} item md={6} >
//                 <Autocomplete
//                     options={countries}
//                     getOptionLabel={(option) => (option.name || '')}
//                     renderInput={(params) => (
//                         <TextField
//                             label='Country'
//                             variant='outlined'
//                             {...params}
//                         />
//                     )}
//                     value={countries.find((country) => country.id === formik.values.country) || null}
//                     onChange={(event, newValue) => {
//                         formik.setFieldValue('country', newValue ? newValue.id : '');
//                         formik.setFieldValue('state', '');
//                         newValue && axiosInstance.get(`/company/country/${newValue.id}/`).then((response) => {
//                             setStates(response.data.states)
//                         })
//                     }}
//                     fullWidth
//                 />
//                 {/* <FormControl fullWidth >
//                     <InputLabel htmlFor={'outlined-label-country'}>Country</InputLabel>
//                     <Select
//                         labelId={'outlined-label-country'}
//                         id={'outlined-country'}
//                         value={formik.values.country}
//                         name={'country'}
//                         onBlur={formik.handleBlur}
//                         onChange={formik.handleChange}
//                         label={'Country'}
//                         inputProps={{
//                             required: true,
//                             onChange: (e) => {
//                                 const countryId = e.target.value
//                                 console.log('Country Id:', countryId)
//                                 axiosInstance.get(`/company/country/${countryId}/`).then((response) => {
//                                     setStates(response.data.states)
//                                 })
//                             }
//                         }}
//                     >
//                         {
//                             countries.map((option, index) => (
//                                 <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
//                             ))
//                         }
//                     </Select>
//                     {
//                         formik.touched.country && formik.errors.country && (
//                             <FormHelperText error id={'standard-weight-helper-text-country'}>
//                                 {formik.errors.country}
//                             </FormHelperText>
//                         )
//                     }
//                 </FormControl> */}
//             </Grid >

//             <Grid key={'0-3'} item md={6} >
//                 <FormControl fullWidth >
//                     <InputLabel htmlFor={'outlined-label-state'}>State</InputLabel>
//                     <Select
//                         labelId={'outlined-label-state'}
//                         id={'outlined-state'}
//                         value={formik.values.state}
//                         name={'state'}
//                         onBlur={formik.handleBlur}
//                         onChange={formik.handleChange}
//                         label={'State'}
//                         inputProps={{ "required": true }}
//                     >
//                         {
//                             states.map((option, index) => (
//                                 <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
//                             ))
//                         }
//                     </Select>
//                     {
//                         formik.touched.state && formik.errors.state && (
//                             <FormHelperText error id={'standard-weight-helper-text-state'}>
//                                 {formik.errors.state}
//                             </FormHelperText>
//                         )
//                     }
//                 </FormControl>
//             </Grid>

//             <Grid key={'0-4'} item md={6} >
//                 <FormControl fullWidth >
//                     <InputLabel htmlFor={'outlined-label-pincode'}>Pincode</InputLabel>
//                     <OutlinedInput
//                         id={'outlined-pincode'}
//                         type={'text'}
//                         value={formik.values.pincode}
//                         name={'pincode'}
//                         onBlur={formik.handleBlur}
//                         onChange={formik.handleChange}
//                         label={'Pincode'}
//                         inputProps={{ "pattern": "[0-9]{6}", "title": "Please enter a valid 6-digit postal code", "required": true }}
//                     />
//                     {
//                         formik.touched.pincode && formik.errors.pincode && (
//                             <FormHelperText error id={'standard-weight-helper-text-pincode'}>
//                                 {formik.errors.pincode}
//                             </FormHelperText>
//                         )
//                     }
//                 </FormControl>
//             </Grid>
//         </>
//     )
// }





















import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import axiosInstance from 'axiosInstance';

export default function Address({ formik, displayCountries = false, md = 6 }) {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([])

    useEffect(() => {
        axiosInstance.get('/company/country/').then((response) => {
            setCountries(response.data);
        });
    }, [])


    useEffect(() => {
        if (formik.values.country) {
            axiosInstance.get(`/company/country/${formik.values.country}/`).then((response) => {
                setStates(response.data.states);
            });
        }
    }, [formik.values.country]);

    useEffect(() => {
        const defaultCountry = countries.find((country) => country.name === 'India');
        if (defaultCountry && !formik.values.country) {
            axiosInstance.get(`/company/country/${defaultCountry.id}/`).then((response) => {
                setStates(response.data.states);
                formik.setFieldValue('state', response.data.states.find((state) => state.name === 'Gujarat')?.id || '');
                formik.setFieldValue('country', defaultCountry.id || '');
            });
        }
    }, [countries, formik.values.country]);

    return (
        <>
            <Grid key={'0-0'} item md={md}>
                <FormControl fullWidth>
                    <InputLabel htmlFor={'outlined-label-address'}>Address</InputLabel>
                    <OutlinedInput
                        id={'outlined-address'}
                        type={'text'}
                        value={formik.values.address}
                        name={'address'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Address'}
                        multiline={true}
                        rows={3}
                    />
                    {formik.touched.address && formik.errors.address && (
                        <FormHelperText error id={'standard-weight-helper-text-address'}>
                            {formik.errors.address}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>

            <Grid key={'0-1'} item md={md}>
                <FormControl fullWidth required>
                    <InputLabel htmlFor={'outlined-label-city'}>City</InputLabel>
                    <OutlinedInput
                        id={'outlined-city'}
                        type={'text'}
                        value={formik.values.city}
                        name={'city'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'City'}
                        inputProps={{ pattern: '[A-Za-z]+', title: 'Please enter only alphabets' }}
                    />
                    {formik.touched.city && formik.errors.city && (
                        <FormHelperText error id={'standard-weight-helper-text-city'}>
                            {formik.errors.city}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>

            {
                displayCountries && <Grid key={'0-2'} item md={md}>
                    <Autocomplete
                        options={countries}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField label='Country' variant='outlined' {...params} required />
                        )}
                        value={countries.find((country) => country.id == formik.values.country) || null}
                        onChange={(event, newValue) => {
                            formik.setFieldValue('country', newValue ? newValue.id : '');
                            formik.setFieldValue('state', '');
                            newValue &&
                                axiosInstance.get(`/company/country/${newValue.id}/`).then((response) => {
                                    setStates(response.data.states);
                                });
                        }}
                        fullWidth
                    />
                </Grid>
            }

            <Grid key={'0-3'} item md={md}>
                <Autocomplete
                    options={states}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField label='State' variant='outlined' {...params} required />
                    )}
                    value={states.find((state) => state.id == formik.values.state) || null}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('state', newValue ? newValue.id : '');
                    }}
                    fullWidth
                />
                {/* <FormControl fullWidth>
                    <InputLabel htmlFor={'outlined-label-state'}>State</InputLabel>
                    <Select
                        labelId={'outlined-label-state'}
                        id={'outlined-state'}
                        value={formik.values.state}
                        name={'state'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'State'}
                        inputProps={{ required: true }}
                    >
                        {states.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.state && formik.errors.state && (
                        <FormHelperText error id={'standard-weight-helper-text-state'}>
                            {formik.errors.state}
                        </FormHelperText>
                    )}
                </FormControl> */}
            </Grid>

            <Grid key={'0-4'} item md={md}>
                <FormControl fullWidth required>
                    <InputLabel htmlFor={'outlined-label-pincode'}>Pincode</InputLabel>
                    <OutlinedInput
                        id={'outlined-pincode'}
                        type={'text'}
                        value={formik.values.pincode}
                        name={'pincode'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'Pincode'}
                        inputProps={{ pattern: '[0-9]{6}', title: 'Please enter a valid 6-digit postal code' }}
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                        <FormHelperText error id={'standard-weight-helper-text-pincode'}>
                            {formik.errors.pincode}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
        </>
    );
}
