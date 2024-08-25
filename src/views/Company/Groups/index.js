import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import CustomForm from 'components/CustomForm'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export default function CompanyGroup() {
    const [groups, setGroups] = useState([])
    const [groupsByCategory, setGroupsByCategory] = useState([])
    const currentCompany = useSelector((state) => state.custom.currentCompany);

    const fetchAllGroups = () => {
        axiosInstance.get('/company/group/').then((response) => {
            setGroups(response.data.sort((a, b) => a.category.localeCompare(b.category)))
            setGroupsByCategory(response.data.filter(group => group.category == 'trading'))
        })
    }

    const getParentGroupName = row => {
        const parent = groups.find((group) => group.id === row.parent)
        return parent ? parent.name : row.name
    }

    useEffect(() => {
        fetchAllGroups()
    }, [currentCompany])

    const formik = useFormik({
        initialValues: {
            name: '',
            parent: '',
            category: 'trading',
        },

        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                await axiosInstance.post('/company/group/', request_data)
                fetchAllGroups()
                alert('Group created successfully');
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
    const addGroupForm = {
        formik: formik,
        title: 'Add Group',
        md: 12,
        sections: [
            [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Group Name',
                    params: {
                        autoFocus: true,
                        required: true,
                    }
                },
                {
                    id: 'parent',
                    type: 'select',
                    label: 'Parent Group',
                    options: groupsByCategory,
                    params: {
                        required: true,
                    }
                },
                {
                    id: 'category',
                    type: 'select',
                    label: 'Category',
                    options: [
                        {
                            id: 'trading',
                            name: 'Trading'
                        },
                        {
                            id: 'profit_loss',
                            name: 'Profit & Loss'
                        },
                        {
                            id: 'balance_sheet',
                            name: 'Balance Sheet'
                        },
                    ],
                    params: {
                        required: true,
                        onChange: (e) => {
                            formik.handleChange(e)

                            const category = e.target.value
                            setGroupsByCategory(groups.filter(group => group.category == category))
                        }
                    }
                },
            ],
        ]
    }
    return (
        <MainCard title="Groups">
            <CustomForm form={addGroupForm} />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Parent Name</TableCell>
                            <TableCell>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{getParentGroupName(row)}</TableCell>
                                <TableCell>{{
                                    trading: 'Trading',
                                    profit_loss: 'Profit & Loss',
                                    balance_sheet: 'Balance Sheet',
                                }[row.category]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    )
}
