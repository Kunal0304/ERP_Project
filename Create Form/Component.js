import { Avatar, Box, Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { IconSquareRoundedX } from '@tabler/icons'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useFormik } from 'formik'

export default function FormDialog() {
    const theme = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [currentSection, setCurrentSection] = useState(0)
    const sections = [[
        <Grid key={'0-0'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-undefined'}>undefined</InputLabel>
                <OutlinedInput
                    id={'outlined-undefined'}
                    type={'undefined'}
                    value={formik.values.undefined}
                    name={'undefined'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'undefined'}
                />
                {
                    formik.touched.undefined && formik.errors.undefined && (
                        <FormHelperText error id={'standard-weight-helper-text-undefined'}>
                            {formik.errors.undefined}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>,
        <Grid key={'0-1'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-undefined'}>undefined</InputLabel>
                <OutlinedInput
                    id={'outlined-undefined'}
                    type={'undefined'}
                    value={formik.values.undefined}
                    name={'undefined'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'undefined'}
                />
                {
                    formik.touched.undefined && formik.errors.undefined && (
                        <FormHelperText error id={'standard-weight-helper-text-undefined'}>
                            {formik.errors.undefined}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>,
        <Grid key={'0-2'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-undefined'}>undefined</InputLabel>
                <OutlinedInput
                    id={'outlined-undefined'}
                    type={'undefined'}
                    value={formik.values.undefined}
                    name={'undefined'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'undefined'}
                />
                {
                    formik.touched.undefined && formik.errors.undefined && (
                        <FormHelperText error id={'standard-weight-helper-text-undefined'}>
                            {formik.errors.undefined}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>,
        <Grid key={'0-3'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-undefined'}>undefined</InputLabel>
                <OutlinedInput
                    id={'outlined-undefined'}
                    type={'undefined'}
                    value={formik.values.undefined}
                    name={'undefined'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'undefined'}
                />
                {
                    formik.touched.undefined && formik.errors.undefined && (
                        <FormHelperText error id={'standard-weight-helper-text-undefined'}>
                            {formik.errors.undefined}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>,
        <Grid key={'0-4'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-undefined'}>undefined</InputLabel>
                <OutlinedInput
                    id={'outlined-undefined'}
                    type={'undefined'}
                    value={formik.values.undefined}
                    name={'undefined'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'undefined'}
                />
                {
                    formik.touched.undefined && formik.errors.undefined && (
                        <FormHelperText error id={'standard-weight-helper-text-undefined'}>
                            {formik.errors.undefined}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>,
        <Grid key={'0-5'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-undefined'}>undefined</InputLabel>
                <OutlinedInput
                    id={'outlined-undefined'}
                    type={'undefined'}
                    value={formik.values.undefined}
                    name={'undefined'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'undefined'}
                />
                {
                    formik.touched.undefined && formik.errors.undefined && (
                        <FormHelperText error id={'standard-weight-helper-text-undefined'}>
                            {formik.errors.undefined}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>,
        <Grid key={'0-6'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-undefined'}>undefined</InputLabel>
                <OutlinedInput
                    id={'outlined-undefined'}
                    type={'undefined'}
                    value={formik.values.undefined}
                    name={'undefined'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'undefined'}
                />
                {
                    formik.touched.undefined && formik.errors.undefined && (
                        <FormHelperText error id={'standard-weight-helper-text-undefined'}>
                            {formik.errors.undefined}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>,
        <Grid key={'0-7'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-undefined'}>undefined</InputLabel>
                <OutlinedInput
                    id={'outlined-undefined'}
                    type={'undefined'}
                    value={formik.values.undefined}
                    name={'undefined'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'undefined'}
                />
                {
                    formik.touched.undefined && formik.errors.undefined && (
                        <FormHelperText error id={'standard-weight-helper-text-undefined'}>
                            {formik.errors.undefined}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>,
        <Grid key={'0-8'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-undefined'}>undefined</InputLabel>
                <OutlinedInput
                    id={'outlined-undefined'}
                    type={'undefined'}
                    value={formik.values.undefined}
                    name={'undefined'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'undefined'}
                />
                {
                    formik.touched.undefined && formik.errors.undefined && (
                        <FormHelperText error id={'standard-weight-helper-text-undefined'}>
                            {formik.errors.undefined}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>,
        <Grid key={'0-9'} item md={6} >
            <FormControl fullWidth >
                <InputLabel htmlFor={'outlined-label-financial_year_beginning'}>Financial Year Beginning</InputLabel>
                <OutlinedInput
                    id={'outlined-financial_year_beginning'}
                    type={'date'}
                    value={formik.values.financial_year_beginning}
                    name={'financial_year_beginning'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={'Financial Year Beginning'}
                    required={true}
                />
                {
                    formik.touched.financial_year_beginning && formik.errors.financial_year_beginning && (
                        <FormHelperText error id={'standard-weight-helper-text-financial_year_beginning'}>
                            {formik.errors.financial_year_beginning}
                        </FormHelperText>
                    )
                }
            </FormControl>
        </Grid>]]

    return (
        <>
            <Dialog open={isOpen} maxWidth="md" fullWidth>
                <DialogTitle borderBottom={`1px solid ${theme.palette.secondary[800]} `}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" fontSize='1.3rem' fontWeight='bold'>
                        <span>Add Company</span>
                        <ButtonBase sx={{ borderRadius: '12px', marginX: 1 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    transition: 'all .2s ease-in-out',
                                    background: theme.palette.secondary.light,
                                    color: theme.palette.secondary.dark,
                                    '&[aria-controls="menu-list-grow"],&:hover': {
                                        background: theme.palette.secondary.dark,
                                        color: theme.palette.secondary.light
                                    },
                                }}
                                onClick={() => {
                                    setIsOpen(false)
                                    // setCurrentSection(0)
                                }}
                                color="inherit"
                            >
                                <IconSquareRoundedX stroke={1.5} size='1.3rem' />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                </DialogTitle>

                <form onSubmit={formik.handleSubmit}>
                    <DialogContent style={{ borderBottom: `1px solid $theme.palette.secondary[800] ` }}>
                        <Grid container spacing={2} my={2}>
                            {/* Sections */}
                            {
                                sections[currentSection]
                            }
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <DialogTitle>
                            <Grid container spacing={2}>
                                {
                                    currentSection > 0 &&
                                    <Grid item>
                                        <Button variant='outlined' onClick={() => { setCurrentSection(currentSection - 1) }} type='button'>Prev</Button>
                                    </Grid>
                                }
                                {
                                    sections && currentSection + 1 != sections?.length &&
                                    <Grid item>
                                        <Button variant='outlined' onClick={() => { setCurrentSection(currentSection + 1) }} type='button'>Next</Button>
                                    </Grid>
                                }
                                {
                                    <Grid item>
                                        <Button variant='outlined' type='submit' style={{ display: sections && currentSection + 1 != sections?.length ? 'none' : '' }} disabled={formik.isSubmitting}>Save</Button>
                                    </Grid>
                                }
                            </Grid>
                        </DialogTitle>
                    </DialogActions>
                </form >
            </Dialog >
        </>
    )
}
