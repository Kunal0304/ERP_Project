import GridInput from 'components/GridInput';
import GridInputSelect from 'components/GridInputSelect';
import { useFormik } from 'formik';
import { Button, Grid, TextField } from '@mui/material';

import React, { useState } from 'react'
import axiosInstance from 'axiosInstance';
import { toast } from 'react-toastify';

export default function _4_CurrentLiabilitiesLedger({ ledgerData, onLedgerUpdate, selectedGroup, setFormStatus, setLedgerData, nameFormik, setCancelForm }) {
    const [currentLedgerData, setCurrentLedgerData] = useState(ledgerData);
    const formik = useFormik({
        initialValues: {
            name: nameFormik.values.name,
            gstin_uin: currentLedgerData?.gstin_uin || '',
            gst_reg_type: currentLedgerData?.gst_reg_type || '',
            gst_applicability: currentLedgerData?.gst_applicability || '',
            statutory_appropriate_to: currentLedgerData?.statutory_appropriate_to || '',
            statutory_method_of_calculation: currentLedgerData?.statutory_method_of_calculation || '',
            opening_balance: currentLedgerData?.opening_balance || '',
            cr_dr: currentLedgerData?.cr_dr || '',
        },

        onSubmit: async (values, { setErrors }) => {
            const request_data = values;
            try {
                if (currentLedgerData) {
                    await axiosInstance.put(`/company/ledgers/current-liabilities/${currentLedgerData.id}/`, request_data);
                    toast.success(`Ledger ${request_data.name} is updated successfully`);
                    formik.resetForm();
                    onLedgerUpdate(null, selectedGroup);
                    setFormStatus(0)
                    setCurrentLedgerData(null);
                    setLedgerData(null);

                } else {
                    request_data.name = nameFormik.values.name
                    await axiosInstance.post('/company/ledgers/current-liabilities/', request_data);
                    toast.success(`Ledger ${request_data.name} is created successfully`);
                    onLedgerUpdate(null, selectedGroup);
                    nameFormik.setFieldValue('name', '')
                    formik.resetForm();
                }


            } catch (error) {
                if (error.response && error.response.status == 400) {
                    const response_data = error.response.data;
                    const errors = {};

                    Object.keys(response_data).forEach((field) => {
                        errors[field] = response_data[field][0];
                    });

                    setErrors(errors);
                }
            }
        }
    });
    const handleCancelClick = () => {
        onLedgerUpdate(null, selectedGroup);
        setCurrentLedgerData(null);
        formik.resetForm();
        setCancelForm(0);
        {
            currentLedgerData &&
                setFormStatus(0);
            currentLedgerData &&
                setLedgerData(null);
        }
    };
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    {currentLedgerData &&

                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                autoFocus
                                name="name"
                                required
                                label="Name"
                                value={formik.values.name}
                                onChange={(e) => {
                                    formik.setFieldValue('name', e.target.value)
                                }}
                                variant="outlined"
                            />
                        </Grid>

                    }


                    <GridInput
                        formik={formik}
                        name={'gstin_uin'}
                        label={'GSTIN/UIN'}
                        required
                    />
                    <GridInputSelect
                        formik={formik}
                        name={'gst_reg_type'}
                        options={[
                            {
                                id: 'regular',
                                name: 'Regular'
                            },
                            {
                                id: 'composition',
                                name: 'Composition'
                            },
                            {
                                id: 'unregistered',
                                name: 'Unregistered'
                            },
                            {
                                id: 'rcm',
                                name: 'RCM'
                            },
                            {
                                id: 'sez',
                                name: 'SEZ'
                            }
                        ]}
                        required
                    />
                    <GridInputSelect
                        formik={formik}
                        name={'gst_applicability'}
                        options={[
                            {
                                id: true,
                                name: 'Yes'
                            },
                            {
                                id: false,
                                name: 'No'
                            },
                        ]}
                        required
                    />
                    <GridInputSelect
                        formik={formik}
                        name={'statutory_appropriate_to'}
                        options={[
                            {
                                id: 'goods',
                                name: 'Goods'
                            },
                            {
                                id: 'services',
                                name: 'Services'
                            },
                            {
                                id: 'capital_goods',
                                name: 'Capital-goods'
                            }
                        ]}
                        required
                    />
                    <GridInputSelect
                        formik={formik}
                        name={'statutory_method_of_calculation'}
                        options={[
                            {
                                id: 'based_on_qty',
                                name: 'Based-on-qty'
                            },
                            {
                                id: 'based_on_value',
                                name: 'Based-on-value'
                            },
                        ]}
                        required
                    />
                    <GridInput
                        formik={formik}
                        name={'opening_balance'}
                        required
                        type='number'
                    />
                    <GridInputSelect
                        formik={formik}
                        name={'cr_dr'}
                        required
                        options={[
                            {
                                id: 'cr',
                                name: 'CR (Credit)'
                            },
                            {
                                id: 'dr',
                                name: 'DR (Debit)'
                            }
                        ]}
                    />
                    <Grid container spacing={2} mt={2} justifyContent={'end'}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="secondary"
                                type="button"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button variant="contained" color="primary" type="submit">
                                {currentLedgerData ? 'Update' : 'Save'}

                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
