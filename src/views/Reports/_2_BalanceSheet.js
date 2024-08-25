import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import './remove-border.css'

export default function BalanceSheet() {
    const company = useSelector((state) => state.custom.currentCompany);
    const [report, setReport] = useState([])

    const mappings = {
        capital_account: 'Capital Account',
        loans_liability: 'Loans (Liability)',
        current_assets: 'Current Assets',
        profit_loss: 'Profit & Loss A/c',
        current_liabilities: 'Current Liabilities',
        fixed_assets: 'Fixed Assets',
        investments: 'Investments',
    }

    var startDate = new Date();
    startDate.setDate(1);

    const formik = useFormik({
        initialValues: {
            start_date: startDate.toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0]
        }
    })


    useEffect(() => {
        axiosInstance.get(`/reports/balance-sheet?start=${formik.values.start_date}&end=${formik.values.end_date}`).then((response) => {
            setReport(response.data)
        })
    }, [company, formik.values])

    report

    return (
        <MainCard title='Balance Sheet' dateForm={formik}>
            <Grid container>
                <Grid item md={6} style={{ borderRight: '2px solid #e0e0e0', height: '100%' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3}>Liabilities</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(report).filter(key => ['capital_account', 'loans_liability', 'current_assets', 'profit_loss'].includes(key)).map((key) => <TableRow key={key}>
                                        <TableCell>
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell colSpan={2}>{mappings[key]}</TableCell>
                                                            <TableCell>{report[key].length > 0 ? report[key].reduce((total, row) => total + row.closing, 0) : ''}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            report[key].map((row) => (
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
                                        </TableCell>
                                    </TableRow>
                                    )
                                }
                            </TableBody >
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item md={6}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Assets</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(report).filter(key => ['current_liabilities', 'fixed_assets', 'investments'].includes(key)).map((key) => <TableRow key={key}>
                                        <TableCell>
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell colSpan={2}>{mappings[key]}</TableCell>
                                                            <TableCell>{report[key].length > 0 ? report[key].reduce((total, row) => total + row.closing, 0) : ''}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            report[key].map((row) => (
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
                                        </TableCell>
                                    </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </MainCard>
    )
}
