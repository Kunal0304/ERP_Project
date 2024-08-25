import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';

export default function PurchaseRegister() {
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


    useEffect(() => {
        axiosInstance.get(`/reports/purchase-register?start=${formik.values.start_date}&end=${formik.values.end_date}`).then((response) => {
            setReport(response.data)
        })
    }, [company, formik.values])


    return (
        <MainCard title='Purchase Register' dateForm={formik}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Particulars</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            report.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{new Date(row.date).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell>{row.particulars}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{new Intl.NumberFormat('en-IN').format(row.credit)}</TableCell>
                                </TableRow>
                            ))
                        }
                        <TableRow>
                            <TableCell colSpan={3} />
                            <TableCell><b>Total: {new Intl.NumberFormat('en-IN').format(report.reduce((total, row) => total + row.credit, 0))}</b></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    )
}
