import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Grid, Autocomplete, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';

export default function LedgerReport() {
    const company = useSelector((state) => state.custom.currentCompany);
    const [report, setReport] = useState([])

    var startDate = new Date();
    startDate.setDate(1);

    const formik = useFormik({
        initialValues: {
            start_date: startDate.toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0]
        }
    })

    const groups = [
        {
            key: "Bank-Accounts-(Banks)",
            value: 'Bank Accounts (Banks)',
        },
        {
            key: "Bank-OCC-a/c",
            value: 'Bank OCC A/C',
        },
        {
            key: "Capital-Account",
            value: 'Capital Account',
        },
        {
            key: "Cash-in-hand",
            value: 'Cash in hand',
        },
        {
            key: "Current-Assets",
            value: 'Current Assets',
        },
        {
            key: "Current-Liabilities",
            value: 'Current Liabilities',
        },
        {
            key: "Deposits-(Asset)",
            value: 'Deposits (Asset)',
        },
        {
            key: "Expenses-(Direct)",
            value: 'Expenses (Direct)',
        },
        {
            key: "Fixed-Assets",
            value: 'Fixed Assets',
        },
        {
            key: "Investments",
            value: 'Investments',
        },
        {
            key: "Loans-&-Advances-(Asset)",
            value: 'Loans & Advances (Asset)',
        },
        {
            key: "Loans-(Liability)",
            value: 'Loans (Liability)',
        },
        {
            key: "Misc.-Expenses-(Asset)",
            value: 'Misc. Expenses (Asset)',
        },
        {
            key: "Provisions",
            value: 'Provisions',
        },
        {
            key: "Purchase-Account",
            value: 'Purchase Account',
        },
        {
            key: "Reserves-&-Surplus",
            value: 'Reserves & Surplus',
        },
        {
            key: "Sales-Account",
            value: 'Sales Account',
        },
        {
            key: "Secured-Loans",
            value: 'Secured Loans',
        },
        {
            key: "Stock-in-hand",
            value: 'Stock in hand',
        },
        {
            key: "Sundry-Creditors-/-Our-Purchase",
            value: 'Sundry Creditors / Our Purchase',
        },
        {
            key: "Sundry-Debtors-/-Our-Sales",
            value: 'Sundry Debtors / Our Sales',
        },
        {
            key: "Suspense-Account",
            value: 'Suspense Account',
        },
        {
            key: "Unsecured-Loans",
            value: 'Unsecured Loans',
        },
        {
            key: "Duties-&-Taxes",
            value: 'Duties & Taxes',
        },
        {
            key: "Expenses-Indirect",
            value: 'Expenses Indirect',
        },
        {
            key: "Income-Direct",
            value: 'Income Direct',
        },
        {
            key: "Income-Indirect",
            value: 'Income Indirect',
        },
    ]

    const [selectedGroup, setSelectedGroup] = useState(groups[0]);

    useEffect(() => {
        axiosInstance.get(`/reports/ledger-report?ledger=${selectedGroup.key}&start=${formik.values.start_date}&end=${formik.values.end_date}`).then((response) => {
            setReport(response.data)
        })
    }, [company, selectedGroup, formik.values])

    return (
        <MainCard title='Ledger Report' dateForm={formik}>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <Autocomplete
                        options={groups}
                        getOptionLabel={(option) => option?.value}
                        renderInput={(params) => <TextField label={'Groups'} variant="outlined" {...params} />}
                        value={selectedGroup ? selectedGroup : 'Bank-Accounts-(Banks)'}
                        onChange={(_, selectedGroup) => {
                            setSelectedGroup(selectedGroup);
                        }}
                        disableClearable
                    />
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Opening</TableCell>
                            <TableCell>Closing</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            report.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.opening > 0 ? row.opening : -row.opening} {row.opening > 0 ? 'CR' : 'DR'}</TableCell>
                                    <TableCell>{row.closing > 0 ? row.closing : -row.closing} {row.closing > 0 ? 'CR' : 'DR'}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    )
}
