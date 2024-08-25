import { Autocomplete, Grid, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import _1_BankAccountsLedger from './Forms/_1_BankAccountsLedger';
import _2_BankOCCAccountLedger from './Forms/_2_BankOCCAccountLedger';
import _3_CurrentAssetsLedger from './Forms/_3_CurrentAssetsLedger';
import _4_CurrentLiabilitiesLedger from './Forms/_4_CurrentLiabilitiesLedger';
import _5_DepositsAssetLedger from './Forms/_5_DepositsAssetLedger';
import _6_DutiesTaxesLedger from './Forms/_6_DutiesTaxesLedger';
import _7_CapitalAccountLedger from './Forms/_7_CapitalAccountLedger';
import _8_CashinHandLedger from './Forms/_8_CashInHandLedger';
import _9_ExpensesDirectLedger from './Forms/_9_ExpensesDirectLedger';
import _10_ExpensesIndirectLedger from './Forms/_10_ExpensesIndirectLedger';
import _11_IncomeDirectLedger from './Forms/_11_IncomeDirectLedger';
import _12_IncomeIndirectLedger from './Forms/_12_IncomeIndirectLedger';
import _13_FixedAssetsLedger from './Forms/_13_FixedAssetsLedger';
import _14_InvestmentsLedger from './Forms/_14_InvestmentsLedger';
import _15_LoansAdvancesAssetLedger from './Forms/_15_LoansAdvancesAssetLedger';
import _16_LoansLiabilityLedger from './Forms/_16_LoansLiabilityLedger';
import _17_MiscExpensesAssetLedger from './Forms/_17_MiscExpensesAssetLedger';
import _18_ProvisionsLedger from './Forms/_18_ProvisionsLedger';
import _19_PurchaseAccountsLedger from './Forms/_19_PurchaseAccountsLedger';
import _20_ReservesSurplusLedger from './Forms/_20_ReservesSurplusLedger';
import _21_SalesAccountsLedger from './Forms/_21_SalesAccountsLedger';
import _22_SecuredLoansLedger from './Forms/_22_SecuredLoansLedger';
import _23_StockinHandLedger from './Forms/_23_StockInHandLedger';
import _24_SundryCreditorsLedger from './Forms/_24_SundryCreditorsLedger';
import _25_SundryDebtorsLedger from './Forms/_25_SundryDebtorsLedger';
import _26_SuspenseaccountLedger from './Forms/_26_SuspenseaccountLedger';
import _27_UnsecuredLoansLiability from './Forms/_27_UnsecuredLoansLiability';
import { useFormik } from 'formik';



const NewComponent = () => {
    const groups = [
        {
            name: 'Select Group',
            form: null
        },
        {
            name: "Bank Accounts",
            form: _1_BankAccountsLedger
        },
        {
            name: "Bank OCC Account",
            form: _2_BankOCCAccountLedger
        },
        {
            name: "Current Assets",
            form: _3_CurrentAssetsLedger
        },
        {
            name: "Current Liabilities",
            form: _4_CurrentLiabilitiesLedger
        },
        {
            name: "Deposits Asset",
            form: _5_DepositsAssetLedger
        },
        {
            name: "Duties Taxes",
            form: _6_DutiesTaxesLedger
        },
        {
            name: "Capital Account",
            form: _7_CapitalAccountLedger
        },
        {
            name: "Cash in Hand",
            form: _8_CashinHandLedger
        },
        {
            name: "Expenses Direct",
            form: _9_ExpensesDirectLedger
        },
        {
            name: "Expenses Indirect",
            form: _10_ExpensesIndirectLedger
        },
        {
            name: "Income Direct",
            form: _11_IncomeDirectLedger
        },
        {
            name: "Income Indirect",
            form: _12_IncomeIndirectLedger
        },
        {
            name: "Fixed Assets",
            form: _13_FixedAssetsLedger
        },
        {
            name: "Investments",
            form: _14_InvestmentsLedger
        },
        {
            name: "Loans Advances Asset",
            form: _15_LoansAdvancesAssetLedger
        },
        {
            name: "Loans Liability",
            form: _16_LoansLiabilityLedger
        },
        {
            name: "Misc Expenses Asset",
            form: _17_MiscExpensesAssetLedger
        },
        {
            name: "Provisions",
            form: _18_ProvisionsLedger
        },
        {
            name: "Purchase Accounts",
            form: _19_PurchaseAccountsLedger
        },
        {
            name: "Reserves Surplus",
            form: _20_ReservesSurplusLedger
        },
        {
            name: "Sales Accounts",
            form: _21_SalesAccountsLedger
        },
        {
            name: "Secured Loans",
            form: _22_SecuredLoansLedger
        },
        {
            name: "Stock in Hand",
            form: _23_StockinHandLedger
        },
        {
            name: "Sundry Creditors / Our Purchase",
            form: _24_SundryCreditorsLedger
        },
        {
            name: "Sundry Debtors / Our Sales",
            form: _25_SundryDebtorsLedger
        },
        {
            name: "Suspense Account",
            form: _26_SuspenseaccountLedger
        },
        {
            name: "Unsecured Loans Liability",
            form: _27_UnsecuredLoansLiability
        }
    ];
    const [selectedGroup, setSelectedGroup] = useState(groups[0]);
    const [cancelForm, setCancelForm] = useState(0);

    const handleGroupChange = async (event, selectedGroup) => {
        if (selectedGroup?.name !== 'All Group') {
            setCancelForm(1)
        }
        setSelectedGroup(selectedGroup);
    };

    const formik = useFormik({
        initialValues: {
            name: ''
        }
    })

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <TextField
                        fullWidth
                        autoFocus
                        name="name"
                        required
                        label="Name"
                        variant="outlined"
                        value={formik.values.name}
                        onChange={(e) => {
                            formik.setFieldValue('name', e.target.value)
                        }}
                    />
                </Grid>

                <Grid item md={4}>
                    <Autocomplete
                        options={groups}
                        getOptionLabel={(option) => option?.name}
                        renderInput={(params) => <TextField label={'Groups'} variant="outlined" {...params} />}
                        value={selectedGroup ? selectedGroup : 'All Groups'}
                        onChange={handleGroupChange}
                        disableClearable
                    />
                </Grid>
            </Grid>
            <>
                {
                    cancelForm == 1 &&
                    <Grid sx={{ marginTop: '16px' }}>
                        {selectedGroup && selectedGroup.form && <selectedGroup.form
                            onLedgerUpdate={handleGroupChange} selectedGroup={selectedGroup} nameFormik={formik} setCancelForm={setCancelForm} />}

                    </Grid>
                }
            </>
        </>
    );
};

export default NewComponent;
