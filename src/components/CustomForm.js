import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Tooltip
} from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Address from './Address';
import { IconSquareRoundedPlus, IconSquareRoundedX } from '@tabler/icons';
import { cloneElement } from 'react';

export default function CustomForm({ form, additionalFields = [] }) {
    const theme = useTheme();
    const [currentSection, setCurrentSection] = useState(0);
    const [modalStatus, setModalStatus] = useState({});
    // console.log(modalStatus);

    // additionalFields.map((field) => {
    //     form.formik.setFieldValue(field.id, '')
    // })

    return (
        <>
            <Box>
                {form.title && (
                    <DialogTitle borderBottom={`1px solid ${theme.palette.secondary[800]}`}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" fontSize="1.2rem" fontWeight="bold">
                            <span>{form.title}</span>
                        </Box>
                    </DialogTitle>
                )}
                <form onSubmit={form.formik.handleSubmit}>
                    <DialogContent style={{ borderBottom: `1px solid ${theme.palette.secondary[800]}` }}>
                        <Grid container spacing={2} my={2}>
                            {/* Sections */}
                            {form.sections &&
                                [...form.sections[currentSection], ...additionalFields]
                                    .filter((field) => field.type != 'show_address')
                                    .map((field, index) => (
                                        <Grid key={`${currentSection}-${index}`} item md={field.md ? field.md : form.md ? form.md : 6}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor={`outlined-label-${field.id}`}>{field.label}</InputLabel>
                                                {field.type === 'select' ? (
                                                    <Select
                                                        labelId={`outlined-label-${field.id}`}
                                                        id={`outlined-${field.id}`}
                                                        value={form.formik.values[field.id]}
                                                        name={field.id}
                                                        onBlur={form.formik.handleBlur}
                                                        onChange={form.formik.handleChange}
                                                        label={field.label}
                                                        {...field.params}
                                                    >
                                                        {field.options.map((option, index) => (
                                                            <MenuItem key={index} value={option.id}>
                                                                {option.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                ) : field.type === 'select/add' ? (
                                                    <>
                                                        <Grid container style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Grid item sm={11}>
                                                                <Select
                                                                    labelId={`outlined-label-${field.id}`}
                                                                    id={`outlined-${field.id}`}
                                                                    value={form.formik.values[field.id]}
                                                                    name={field.id}
                                                                    onBlur={form.formik.handleBlur}
                                                                    onChange={form.formik.handleChange}
                                                                    label={field.label}
                                                                    {...field.params}
                                                                    fullWidth
                                                                >
                                                                    {field.options.map((option, index) => (
                                                                        <MenuItem key={index} value={option.id}>
                                                                            {option.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </Grid>
                                                            <Grid item sm={1}>
                                                                <Tooltip
                                                                    title={`Add ${field.id
                                                                        .split('_')
                                                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                                        .join(' ')}`}
                                                                    arrow
                                                                >
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
                                                                                }
                                                                            }}
                                                                            onClick={() => {
                                                                                setModalStatus({ [field.id]: true });
                                                                            }}
                                                                            color="inherit"
                                                                        >
                                                                            <IconSquareRoundedPlus stroke={1.5} size="1.3rem" />
                                                                        </Avatar>
                                                                    </ButtonBase>
                                                                </Tooltip>
                                                            </Grid>
                                                        </Grid>
                                                        <Dialog open={modalStatus[field.id] || false} maxWidth="md" fullWidth>
                                                            <DialogTitle borderBottom={`1px solid ${theme.palette.secondary[800]}`}>
                                                                <Box
                                                                    display="flex"
                                                                    justifyContent="space-between"
                                                                    alignItems="center"
                                                                    fontSize="1.3rem"
                                                                    fontWeight="bold"
                                                                >
                                                                    <Box width={'100%'} textAlign={'center'}>
                                                                        <span>
                                                                            Add{' '}
                                                                            {field.id
                                                                                .split('_')
                                                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                                                .join(' ')}
                                                                        </span>
                                                                    </Box>
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
                                                                                }
                                                                            }}
                                                                            onClick={() => {
                                                                                setModalStatus({ [field.id]: false });
                                                                            }}
                                                                            color="inherit"
                                                                        >
                                                                            <IconSquareRoundedX stroke={1.5} size="1.3rem" />
                                                                        </Avatar>
                                                                    </ButtonBase>
                                                                </Box>
                                                            </DialogTitle>

                                                            <DialogContent
                                                                style={{ borderBottom: `1px solid $theme.palette.secondary[800]` }}
                                                            >
                                                                {cloneElement(field.form, {
                                                                    closeModal: () => {
                                                                        setModalStatus({ [field.id]: false });
                                                                    }
                                                                })}
                                                            </DialogContent>
                                                        </Dialog>
                                                    </>
                                                ) : (
                                                    <OutlinedInput
                                                        id={`outlined-${field.id}`}
                                                        type={field.type}
                                                        value={form.formik.values[field.id]}
                                                        name={field.id}
                                                        onBlur={form.formik.handleBlur}
                                                        onChange={form.formik.handleChange}
                                                        label={field.label}
                                                        {...field.params}
                                                    />
                                                )}
                                                {form.formik.touched[field.id] && form.formik.errors[field.id] && (
                                                    <FormHelperText error id={`standard-weight-helper-text-${field.id}`}>
                                                        {form.formik.errors[field.id]}
                                                    </FormHelperText>
                                                )}
                                                {/* {touched.phoneNumber && errors.phoneNumber && (
                                                    <FormHelperText error id="standard-weight-helper-text-phoneNumber-login">
                                                        {errors.phoneNumber}
                                                    </FormHelperText>
                                                )} */}
                                            </FormControl>
                                        </Grid>
                                    ))}
                            {
                                // form.formik.group && form.formik.group != 'Capital Account' && form.formik.group != 'Duties & Taxes' && <Address formik={form.formik} />
                                form.formik.values.show_address && <Address formik={form.formik} />
                            }
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <DialogTitle>
                            <Grid container spacing={2}>
                                {currentSection > 0 && (
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setCurrentSection(currentSection - 1);
                                            }}
                                            type="button"
                                        >
                                            Prev
                                        </Button>
                                    </Grid>
                                )}
                                {form.sections && currentSection + 1 != form.sections?.length && (
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setCurrentSection(currentSection + 1);
                                            }}
                                            type="button"
                                        >
                                            Next
                                        </Button>
                                    </Grid>
                                )}
                                {
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            type="submit"
                                            style={{ display: form.sections && currentSection + 1 != form.sections?.length ? 'none' : '' }}
                                            disabled={form.formik.isSubmitting}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                }
                            </Grid>
                        </DialogTitle>
                    </DialogActions>
                </form>
            </Box>
        </>
    );
}
