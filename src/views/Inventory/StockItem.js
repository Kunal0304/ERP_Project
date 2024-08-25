import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import CustomForm from 'components/CustomForm'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import StockGroup from './StockGroup'
import StockUnit from './StockUnit'
import StockGodown from './StockGodown'

export default function StockItem() {
    const [items, setItems] = useState([])
    const [units, setUnits] = useState([])
    const [stockGodowns, setStockGodowns] = useState([])
    const [stockGroups, setStockGroups] = useState([])

    const currentCompany = useSelector((state) => state.custom.currentCompany);

    const fetchAllUnits = () => {
        axiosInstance.get('/inventory/stock-unit/').then((response) => {
            setUnits(response.data.sort((a, b) => a.formal_name.localeCompare(b.formal_name)).map((item) => ({
                ...item,
                name: `${item.symbol} - ${item.formal_name}`
            })))
        })
    }

    const fetchAllGroups = () => {
        axiosInstance.get('/inventory/stock-group/').then((response) => {
            setStockGroups(response.data.sort((a, b) => a.name.localeCompare(b.name)))
        })
    }

    const fetchAllItems = () => {
        axiosInstance.get('/inventory/stock-item/').then((response) => {
            setItems(response.data.sort((a, b) => a.name.localeCompare(b.name)))
        })
    }

    const fetchAllGodowns = () => {
        axiosInstance.get('/inventory/stock-godown/').then((response) => {
            setStockGodowns(response.data.sort((a, b) => a.name.localeCompare(b.name)))
        })
    }

    const getStockGroupName = row => {
        const stock_group = items.find((item) => item.id === row.stock_group)
        return stock_group ? stock_group.name : '-'
    }

    useEffect(() => {
        fetchAllUnits()
        fetchAllGroups()
        fetchAllGodowns()
        fetchAllItems()
        formik?.resetForm()
    }, [currentCompany])

    const formik = useFormik({
        initialValues: {
            name: '',
            stock_group: '',
            unit: '',
            stock_godown: '',
            gst_applicability: false,
            hsn: '',
            tax_type: 'inclusive',
            taxability_type: '',
            i_gst: '',
            c_gst: '',
            s_gst: '',
            supply_type: '',
            duty_rate: 0,
            quantity: 0,
            rate: 0,
            value: 0,
            deemed_export_percentage: 0,
        },

        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                await axiosInstance.post('/inventory/stock-item/', request_data)
                fetchAllItems()
                alert('Item created successfully');
                formik.resetForm()
            } catch (error) {
                if (error.response && error.response.status == 400) {
                    const response_data = error.response.data
                    const errors = {}

                    Object.keys(response_data).forEach((field) => {
                        errors[field] = response_data[field][0];
                    });
                    setErrors(errors)
                }
            }
        }
    })

    const addItemFormGoods = {
        formik: formik,
        title: 'Add Stock Item',
        // md: 12,
        sections: [
            [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Item Name',
                    params: {
                        autoFocus: true,
                        required: true,
                    }
                },
                {
                    id: 'stock_group',
                    type: 'select/add',
                    label: 'Stock Group',
                    options: stockGroups,
                    form: <StockGroup setGroups={setStockGroups} />,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'unit',
                    type: 'select/add',
                    label: 'Unit',
                    options: units,
                    form: <StockUnit setUnits={setUnits} />,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'stock_godown',
                    type: 'select/add',
                    label: 'Godown',
                    options: stockGodowns,
                    form: <StockGodown setGodowns={setStockGodowns} />,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'gst_applicability',
                    type: 'select',
                    label: 'GST Applicability',
                    options: [
                        {
                            id: true,
                            name: 'Yes'
                        },
                        {
                            id: false,
                            name: 'No'
                        },
                    ],
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'hsn',
                    type: 'text',
                    label: 'HSN',
                },
                {
                    id: 'deemed_export_percentage',
                    type: 'number',
                    label: 'Deemed Export Percentage',
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'tax_type',
                    type: 'select',
                    label: 'Tax Type',
                    options: [
                        {
                            id: 'inclusive',
                            name: 'Inclusive'
                        },
                        {
                            id: 'exclusive',
                            name: 'Exclusive'
                        },
                    ],
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'taxability_type',
                    type: 'select',
                    label: 'Taxability Type',
                    options: [
                        {
                            id: 'exempt',
                            name: 'Exempt'
                        },
                        {
                            id: 'nil_rated',
                            name: 'Nil Rated'
                        },
                        {
                            id: 'non_gst',
                            name: 'Non-GST'
                        },
                        {
                            id: 'taxable',
                            name: 'Taxable'
                        },
                    ],
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'i_gst',
                    type: 'select',
                    label: 'I-GST',
                    options: [
                        {
                            id: 0,
                            name: 0,
                        },
                        {
                            id: 5,
                            name: 5,
                        },
                        {
                            id: 12,
                            name: 12,
                        },
                        {
                            id: 18,
                            name: 18,
                        },
                        {
                            id: 28,
                            name: 28,
                        },
                    ],
                    params: {
                        onChange: (e) => {
                            formik.handleChange(e)
                            formik.setFieldValue('c_gst', e.target.value / 2)
                            formik.setFieldValue('s_gst', e.target.value / 2)
                        },
                        required: true,
                    },
                },
                {
                    id: 'c_gst',
                    type: 'number',
                    label: 'C-GST',
                    params: {
                        required: true,
                    }
                },
                {
                    id: 's_gst',
                    type: 'number',
                    label: 'S-GST',
                    params: {
                        required: true,
                    }

                },
                {
                    id: 'duty_rate',
                    type: 'number',
                    label: 'Duty Rate',
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'quantity',
                    type: 'number',
                    label: 'Quantity',
                    params: {
                        onChange: (e) => {
                            formik.handleChange(e)
                            formik.setFieldValue('value', e.target.value * formik.values.rate)
                        },
                        required: true,
                    },
                },
                {
                    id: 'rate',
                    type: 'number',
                    label: 'Rate',
                    params: {
                        onChange: (e) => {
                            formik.handleChange(e)
                            formik.setFieldValue('value', e.target.value * formik.values.quantity)
                        },
                        required: true,
                    },
                },
                {
                    id: 'value',
                    type: 'number',
                    label: 'value',
                    params: {
                        required: true,
                    }
                },
            ],
        ]
    }

    if (currentCompany?.supply_type != formik.values.supply_type) {
        formik.setFieldValue('supply_type', currentCompany?.supply_type)
    }

    const addItemFormServices = {
        formik: formik,
        title: 'Add Stock Item',
        // md: 12,
        sections: [
            [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Item Name',
                    params: {
                        autoFocus: true,
                        required: true,
                    }
                },
                {
                    id: 'stock_group',
                    type: 'select/add',
                    label: 'Stock Group',
                    options: stockGroups,
                    form: <StockGroup setGroups={setStockGroups} />,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'gst_applicability',
                    type: 'select',
                    label: 'GST Applicability',
                    options: [
                        {
                            id: true,
                            name: 'Yes'
                        },
                        {
                            id: false,
                            name: 'No'
                        },
                    ],
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'hsn',
                    type: 'text',
                    label: 'HSN',
                },
                {
                    id: 'tax_type',
                    type: 'select',
                    label: 'Tax Type',
                    options: [
                        {
                            id: 'inclusive',
                            name: 'Inclusive'
                        },
                        {
                            id: 'exclusive',
                            name: 'Exclusive'
                        },
                    ],
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'taxability_type',
                    type: 'select',
                    label: 'Taxability Type',
                    options: [
                        {
                            id: 'exempt',
                            name: 'Exempt'
                        },
                        {
                            id: 'nil_rated',
                            name: 'Nil Rated'
                        },
                        {
                            id: 'non_gst',
                            name: 'Non-GST'
                        },
                        {
                            id: 'taxable',
                            name: 'Taxable'
                        },
                    ],
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'i_gst',
                    type: 'select',
                    label: 'I-GST',
                    options: [
                        {
                            id: 0,
                            name: 0,
                        },
                        {
                            id: 5,
                            name: 5,
                        },
                        {
                            id: 12,
                            name: 12,
                        },
                        {
                            id: 18,
                            name: 18,
                        },
                        {
                            id: 28,
                            name: 28,
                        },
                    ],
                    params: {
                        onChange: (e) => {
                            formik.handleChange(e)
                            formik.setFieldValue('c_gst', e.target.value / 2)
                            formik.setFieldValue('s_gst', e.target.value / 2)
                        },
                        required: true,
                    },
                },
                {
                    id: 'c_gst',
                    type: 'number',
                    label: 'C-GST',
                    params: {
                        required: true,
                    }
                },
                {
                    id: 's_gst',
                    type: 'number',
                    label: 'S-GST',
                    params: {
                        required: true,
                    }

                },
                {
                    id: 'quantity',
                    type: 'number',
                    label: 'Quantity',
                    params: {
                        onChange: (e) => {
                            formik.handleChange(e)
                            formik.setFieldValue('value', e.target.value * formik.values.rate)
                        },
                        required: true,
                    },
                },
                {
                    id: 'rate',
                    type: 'number',
                    label: 'Rate',
                    params: {
                        onChange: (e) => {
                            formik.handleChange(e)
                            formik.setFieldValue('value', e.target.value * formik.values.quantity)
                        },
                        required: true,
                    },
                },
                {
                    id: 'value',
                    type: 'number',
                    label: 'value',
                    params: {
                        required: true,
                    }
                },
            ],
        ]
    }
    return (
        <MainCard title="Stock Items">
            <CustomForm form={currentCompany?.supply_type == 'services' ? addItemFormServices : addItemFormGoods} />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Stock Group</TableCell>
                            {/* <TableCell>Unit</TableCell> */}
                            <TableCell>GST Applicability</TableCell>
                            <TableCell>Tax Type</TableCell>
                            <TableCell>quantity</TableCell>
                            <TableCell>rate</TableCell>
                            <TableCell>value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{getStockGroupName(row)}</TableCell>
                                {/* <TableCell>{row.unit_details.formal_name}</TableCell> */}
                                <TableCell>{{
                                    true: 'Yes',
                                    false: 'No',
                                }[row.gst_applicability]}</TableCell>
                                <TableCell>{{
                                    inclusive: 'Inclusive',
                                    exclusive: 'Exclusive'
                                }[row.tax_type]}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.rate}</TableCell>
                                <TableCell>{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    )
}
