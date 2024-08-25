import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import GridAutoComplete from 'components/GridAutoComplete';
import { Avatar, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
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
        payment_number: 'COMP/24/03/11/1',
        account_object_id: '',
        account_content_type: '',
        to_party: '',
        to_party_object_id: '',
        to_party_content_type: '',
        amount: '',
        records: [
            {
                to_party: '',
                to_party_object_id: '',
                to_party_content_type: '',
                amount: '',
            }
        ],
        narration: '',
        date: new Date().toISOString().split('T')[0],
    }

    const formik = useFormik({
        initialValues: formikDefaultValues,
        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                if (formStatus == 2) {
                    const data = {
                        id: request_data.id,
                        account: request_data.account,
                        payment_number: request_data.payment_number,
                        account_object_id: request_data.account_object_id,
                        account_content_type: request_data.account_content_type,
                        to_party: request_data.records[0].to_party,
                        to_party_object_id: request_data.records[0].to_party_object_id,
                        to_party_content_type: request_data.records[0].to_party_content_type,
                        amount: request_data.records[0].amount,
                        narration: request_data.narration,
                        date: request_data.date,
                    }
                    await axiosInstance.put(`/voucher/payment-voucher/${request_data.id}/`, data)
                    toast.success(`Voucher updated successfully`);
                }
                else {
                    request_data.records.forEach(async (record) => {
                        const data = {
                            id: request_data.id,
                            account: request_data.account,
                            payment_number: request_data.payment_number,
                            account_object_id: request_data.account_object_id,
                            account_content_type: request_data.account_content_type,
                            to_party: record.to_party,
                            to_party_object_id: record.to_party_object_id,
                            to_party_content_type: record.to_party_content_type,
                            amount: record.amount,
                            narration: request_data.narration,
                            date: request_data.date,
                        }

                        await axiosInstance.post('/voucher/payment-voucher/', data)
                        // toast.success(`Voucher ${index + 1} added successfully`);
                    });
                    toast.success(`Vouchers added successfully`);
                }

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
        <MainCard title={formStatus == 2 && 'Update Payment Voucher' || formStatus && 'Add Payment Voucher' || 'Payment Vouchers'
        } formStatus={formStatus} setFormStatus={setFormStatus} >
            {
                formStatus ?
                    <>
                        < Box minHeight="70vh" >
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item md={9.5}>

                                    </Grid>
                                    <GridInput
                                        formik={formik}
                                        name={'payment_number'}
                                        md={2.5}
                                        inputProps={{
                                            readOnly: true
                                        }}
                                    />
                                </Grid>
                                <Grid container spacing={2} my={2}>
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
                                    <Grid item md={5.5}>

                                    </Grid>

                                    <GridInput
                                        formik={formik}
                                        name={'date'}
                                        type='date'
                                        required
                                        md={2.5}
                                    />
                                </Grid>
                                <TableContainer component={Paper} >
                                    <Table sx={{
                                        borderRadius: "0px !important",
                                        border: '1px solid #dddddd',

                                    }}>
                                        <TableHead>
                                            <TableRow >
                                                <TableCell>Sr No</TableCell>
                                                <TableCell sx={{ borderLeft: '1px solid #dddddd' }}>Party Name</TableCell>
                                                <TableCell sx={{ borderLeft: '1px solid #dddddd', }}>Amount</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                formik.values.records.map((record, index) => (
                                                    <TableRow key={index} sx={{ border: '1px solid #dddddd' }}>
                                                        <TableCell width="7%" >
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell width="73%" sx={{ borderLeft: '1px solid #dddddd' }}>
                                                            <GridAutoComplete
                                                                formik={formik}
                                                                getOptionLabel={option => option.name + ' - ' + option.id.charAt(0).toUpperCase() + option.id.split('_')[0].slice(1, -6) || ''}
                                                                getValue={allLedgers.find(ledger => ledger.id == formik.values.records[index].to_party_object_id) || null}
                                                                name={`records[${index}].to_party`}
                                                                label={'To Party'}
                                                                onChange={(event, option) => {
                                                                    formik.setFieldValue(`records[${index}].to_party`, '');
                                                                    formik.setFieldValue(`records[${index}].to_party_object_id`, option?.id || '');
                                                                    formik.setFieldValue(`records[${index}].to_party_content_type`, option?.content_type || '');

                                                                    if (formStatus != 2 && formik.values.records.length == index + 1) {
                                                                        formik.values.records.push({
                                                                            to_party: '',
                                                                            to_party_object_id: '',
                                                                            to_party_content_type: '',
                                                                            amount: '',
                                                                        })
                                                                    }
                                                                }}
                                                                options={allLedgers}
                                                                required={index == 0 || formik.values.records.length != index + 1}
                                                            />
                                                        </TableCell>
                                                        <TableCell width="20%" sx={{ borderLeft: '1px solid #dddddd' }}>
                                                            <GridInput
                                                                formik={formik}
                                                                name={`records[${index}].amount`}
                                                                label={'Amount'}
                                                                value={formik.values.records[index].amount}
                                                                type='number'
                                                                required={index == 0 || formik.values.records.length != index + 1}
                                                                inputProps={{
                                                                    onChange: (event) => {
                                                                        formik.setFieldValue(`records[${index}].amount`, event.target.value);

                                                                        if (formStatus != 2 && formik.values.records.length == index + 1) {
                                                                            formik.values.records.push({
                                                                                to_party: '',
                                                                                to_party_object_id: '',
                                                                                to_party_content_type: '',
                                                                                amount: '',
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />

                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Grid container spacing={2} mt={2} >
                                    <GridInput
                                        formik={formik}
                                        name={'narration'}
                                        params={{
                                            multiline: true,
                                            rows: 5
                                        }}
                                    />
                                    <Grid md={6}></Grid>
                                    <Grid item mt={12}>
                                        <Button variant="outlined" color="secondary" onClick={() => setFormStatus(0)}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item mt={12}>
                                        <Button variant="contained" color="primary" type="submit">
                                            {
                                                formStatus == 1 ? 'Save' : 'Update'
                                            }
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box >
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
                                                            formik.setFieldValue('records', [{
                                                                to_party: voucher.to_party,
                                                                to_party_object_id: voucher.to_party_object_id,
                                                                to_party_content_type: voucher.to_party_content_type,
                                                                amount: voucher.amount,
                                                            }])
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