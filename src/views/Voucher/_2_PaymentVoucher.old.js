import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import GridAutoComplete from 'components/GridAutoComplete';
import { Avatar, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import GridInput from 'components/GridInput';
import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function PaymentVoucher() {
    const currentCompany = useSelector((state) => state.custom.currentCompany);
    const [formStatus, setFormStatus] = useState(0)
    const [vouchers, setVouchers] = useState([])
    const [threeLedgers, setThreeLedgers] = useState([])
    const [allLedgers, setAllLedgers] = useState([])

    const theme = useTheme();

    const fetchAllVouchers = () => {
        axiosInstance.get('/voucher/payment-voucher/').then((response) => {
            setVouchers(response.data)
        })
    }

    const fetchThreeLedgers = () => {
        axiosInstance.get('/company/three-ledgers/').then((response) => {
            setThreeLedgers(response.data)
        })
    }

    const fetchAllLedgers = () => {
        axiosInstance.get('/company/ledgers/').then((response) => {
            setAllLedgers(response.data)
        })
    }

    const formikDefaultValues = {
        id: null,
        account: '',
        account_object_id: '',
        account_content_type: '',
        to_party: '',
        to_party_object_id: '',
        to_party_content_type: '',
        amount: '',
        narration: '',
        date: new Date().toISOString().split('T')[0],
    }

    const formik = useFormik({
        initialValues: formikDefaultValues,
        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                if (formStatus == 2)
                    await axiosInstance.put(`/voucher/payment-voucher/${request_data.id}/`, request_data)
                else
                    await axiosInstance.post('/voucher/payment-voucher/', request_data)
                toast.success(`Voucher ${formStatus == 2 ? 'updated' : 'added'} successfully`);

                fetchAllVouchers()

                if (formStatus == 2)
                    setFormStatus(0)

                formik.resetForm()
            } catch (error) {
                if (error.response && error.response.status == 400) {
                    const response_data = error.response.data
                    const errors = {}

                    Object.keys(response_data).forEach((field) => {
                        if (field.includes('account'))
                            errors['account'] = response_data[field][0];

                        if (field.includes('to_party'))
                            errors['to_party'] = response_data[field][0];

                        errors[field] = response_data[field][0];
                    });
                    setErrors(errors)
                }
            }
        }
    })

    useEffect(() => {
        fetchAllVouchers()
        fetchThreeLedgers()
        fetchAllLedgers()
    }, [currentCompany])

    useEffect(() => {
        formStatus == 0 && formik.setValues(formikDefaultValues)
    }, [formStatus])


    return (
        <MainCard title={formStatus && 'Add Payment Voucher' || 'Payment Vouchers'} formStatus={formStatus} setFormStatus={setFormStatus}>
            {
                formStatus ?
                    <>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <GridInput
                                    formik={formik}
                                    name={'date'}
                                    type='date'
                                    required
                                />

                                <GridAutoComplete
                                    formik={formik}
                                    getOptionLabel={option => option.name + ' - ' + option.id.charAt(0).toUpperCase() + option.id.split('_')[0].slice(1, -6) || ''}
                                    getValue={threeLedgers.find(ledger => ledger.id == formik.values.account_object_id) || null}
                                    name={'account'}
                                    onChange={(event, option) => {
                                        formik.setFieldValue('account', '');
                                        formik.setFieldValue('account_object_id', option?.id || '');
                                        formik.setFieldValue('account_content_type', option?.content_type || '');
                                    }}
                                    options={threeLedgers}
                                    required
                                />

                                <GridAutoComplete
                                    formik={formik}
                                    getOptionLabel={option => option.name + ' - ' + option.id.charAt(0).toUpperCase() + option.id.split('_')[0].slice(1, -6) || ''}
                                    getValue={allLedgers.find(ledger => ledger.id == formik.values.to_party_object_id) || null}
                                    name={'to_party'}
                                    onChange={(event, option) => {
                                        formik.setFieldValue('to_party', '');
                                        formik.setFieldValue('to_party_object_id', option?.id || '');
                                        formik.setFieldValue('to_party_content_type', option?.content_type || '');
                                    }}
                                    options={allLedgers}
                                    required
                                />

                                <GridInput
                                    formik={formik}
                                    name={'amount'}
                                    type='number'
                                    required
                                />

                                <GridInput
                                    formik={formik}
                                    name={'narration'}
                                    params={{
                                        multiline: true,
                                        rows: 3
                                    }}
                                />

                                <Grid container spacing={2} mt={2} justifyContent={'end'}>
                                    <Grid item>
                                        <Button variant="outlined" color="secondary" onClick={() => setFormStatus(0)}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item >
                                        <Button variant="contained" color="primary" type="submit">
                                            {
                                                formStatus == 1 ? 'Save' : 'Update'
                                            }
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </>
                    :
                    <>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Account</TableCell>
                                        <TableCell>To Party</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        vouchers.map((voucher, index) => (
                                            <TableRow key={voucher.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{new Date(voucher.date).toLocaleDateString('en-GB')}</TableCell>
                                                <TableCell>{voucher.account.name}</TableCell>
                                                <TableCell>{voucher.to_party.name}</TableCell>
                                                <TableCell>{voucher.amount}</TableCell>
                                                <TableCell sx={{ display: 'flex' }}>
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
                                                                color: theme.palette.secondary.light,
                                                            },
                                                            marginLeft: '4px',
                                                            marginRight: '4px',
                                                        }}
                                                        onClick={() => {
                                                            formik.setValues(voucher)
                                                            setFormStatus(2)
                                                        }}
                                                        color="inherit"
                                                    >
                                                        <EditOutlined />
                                                    </Avatar>

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
                                                                color: theme.palette.secondary.light,
                                                            },
                                                            marginLeft: '4px',
                                                            marginRight: '4px',
                                                        }}
                                                        onClick={() => {
                                                            if (confirm('Are you sure?')) {
                                                                (async () => {
                                                                    try {
                                                                        await axiosInstance.delete(`/voucher/payment-voucher/${voucher.id}/`)

                                                                        toast.success(`Voucher deleted successfully`);

                                                                        fetchAllVouchers()
                                                                    } catch (error) {
                                                                        toast.error(`Error while deleting a voucher`);
                                                                    }
                                                                })()
                                                            }
                                                        }}
                                                        color="inherit"
                                                    >
                                                        <DeleteOutlineOutlined />
                                                    </Avatar>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
            }
        </MainCard >
    )
}
