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

export default function PurchaseReturnVoucher() {
    const currentCompany = useSelector((state) => state.custom.currentCompany);
    const [formStatus, setFormStatus] = useState(0)
    const [vouchers, setVouchers] = useState([])
    const [sundryLedgers, setSundryLedgers] = useState([])
    const [stockItems, setStockItems] = useState([])
    const [godowns, setGodowns] = useState([])

    const theme = useTheme();

    const fetchAllVouchers = () => {
        axiosInstance.get('/voucher/purchase-return-voucher/').then((response) => {
            setVouchers(response.data)
        })
    }

    const fetchSundryLedgers = () => {
        axiosInstance.get('/company/sundry-ledgers/').then((response) => {
            setSundryLedgers(response.data)
        })
    }

    const fetchStockItems = () => {
        axiosInstance.get('/inventory/stock-item/').then((response) => {
            setStockItems(response.data)
        })
    }

    const fetchGodowns = () => {
        axiosInstance.get('/inventory/stock-godown/').then((response) => {
            setGodowns(response.data)
        })
    }

    const formikDefaultValues = {
        id: null,
        from_party: '',
        from_party_object_id: '',
        from_party_content_type: '',
        stock_item: '',
        godown: '',
        qty: '',
        rate: '',
        i_gst: 0,
        c_gst: 0,
        s_gst: 0,
        narration: '',
        date: new Date().toISOString().split('T')[0],
    }

    const formik = useFormik({
        initialValues: formikDefaultValues,
        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                if (formStatus == 2)
                    await axiosInstance.put(`/voucher/purchase-return-voucher/${request_data.id}/`, request_data)
                else
                    await axiosInstance.post('/voucher/purchase-return-voucher/', request_data)
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

                        if (field.includes('from_party'))
                            errors['from_party'] = response_data[field][0];

                        errors[field] = response_data[field][0];
                    });
                    setErrors(errors)
                }
            }
        }
    })

    useEffect(() => {
        fetchAllVouchers()
        fetchSundryLedgers()
        fetchStockItems()
        fetchGodowns()
    }, [currentCompany])

    useEffect(() => {
        formStatus == 0 && formik.setValues(formikDefaultValues)
    }, [formStatus])


    return (
        <MainCard title={formStatus && 'Add Purchase Return Voucher' || 'Purchase Return Vouchers'} formStatus={formStatus} setFormStatus={setFormStatus}>
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
                                    getValue={sundryLedgers.find(ledger => ledger.id == formik.values.from_party_object_id) || null}
                                    name={'from_party'}
                                    onChange={(event, option) => {
                                        formik.setFieldValue('from_party', '');
                                        formik.setFieldValue('from_party_object_id', option?.id || '');
                                        formik.setFieldValue('from_party_content_type', option?.content_type || '');
                                    }}
                                    options={sundryLedgers}
                                    required
                                />

                                <GridAutoComplete
                                    formik={formik}
                                    getOptionLabel={option => option.name + ' - ' + option.quantity || ''}
                                    getValue={stockItems.find(item => item.id == formik.values.stock_item) || null}
                                    name={'stock_item'}
                                    onChange={(event, option) => {
                                        formik.setFieldValue('stock_item', option.id || '');
                                    }}
                                    options={stockItems}
                                    required
                                />

                                <GridAutoComplete
                                    formik={formik}
                                    getOptionLabel={option => option.name + ' - ' + option.city || ''}
                                    getValue={godowns.find(item => item.id == formik.values.godown) || null}
                                    name={'godown'}
                                    onChange={(event, option) => {
                                        formik.setFieldValue('godown', option.id || '');
                                    }}
                                    options={godowns}
                                    required
                                />

                                <GridInput
                                    formik={formik}
                                    name={'qty'}
                                    type='number'
                                    required
                                />

                                <GridInput
                                    formik={formik}
                                    name={'rate'}
                                    type='number'
                                    required
                                />

                                {
                                    formStatus == 2 && <>
                                        <GridInput
                                            formik={formik}
                                            name={'i_gst'}
                                            label={'I GST'}
                                            type='number'
                                            params={{
                                                onChange: (e) => {
                                                    formik.setFieldValue('i_gst', e.target.value)
                                                    formik.setFieldValue('c_gst', e.target.value / 2)
                                                    formik.setFieldValue('s_gst', e.target.value / 2)
                                                }
                                            }}
                                            required
                                        />

                                        <GridInput
                                            formik={formik}
                                            name={'c_gst'}
                                            label={'C GST'}
                                            type='number'
                                            required
                                        />

                                        <GridInput
                                            formik={formik}
                                            name={'s_gst'}
                                            label={'S GST'}
                                            type='number'
                                            required
                                        />
                                    </>
                                }

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
                                        <TableCell>From Party</TableCell>
                                        <TableCell>Stock Item</TableCell>
                                        <TableCell>QTY</TableCell>
                                        <TableCell>Rate</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        vouchers.map((voucher, index) => (
                                            <TableRow key={voucher.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{new Date(voucher.date).toLocaleDateString('en-GB')}</TableCell>
                                                <TableCell>{voucher.from_party.name}</TableCell>
                                                <TableCell>{voucher.stock_item_details.name}</TableCell>
                                                <TableCell>{voucher.qty}</TableCell>
                                                <TableCell>{voucher.rate}</TableCell>
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
                                                                        await axiosInstance.delete(`/voucher/purchase-return-voucher/${voucher.id}/`)

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
