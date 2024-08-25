
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import axiosInstance from 'axiosInstance';
import { Autocomplete, Avatar, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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
import { useEffect } from 'react';
import NewComponent from './NewComponent';
import { useFormik } from 'formik';


export default function CompanyLedger() {
	const currentCompany = useSelector((state) => state.custom.currentCompany);
	const theme = useTheme();

	const groups = [
		{
			name: 'All Groups',
			form: null,
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
			name: "Sundry Creditors",
			form: _24_SundryCreditorsLedger
		},
		{
			name: "Sundry Debtors",
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

	const [orderDirection, setOrderDirection] = useState('asc')
	const [valueToOrederBy, setValueToOrederBy] = useState('name')
	const [rowInformation, setRowInformation] = useState([]);
	const [ledgerData, setLedgerData] = useState(null);

	const nameFormik = useFormik({
		initialValues: {
			name: ''
		}
	})

	const fetchLedgerData = async (selectedGroup) => {
		try {
			const apiUrl = `/company/ledgers/${selectedGroup.name == 'All Groups' ? '' : selectedGroup.name.toLowerCase().replace(/ /g, '-') + '/'}`;
			const response = await axiosInstance.get(apiUrl);
			setRowInformation(response.data);
		} catch (error) {
			toast.error('Error while fetching information');
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const apiUrl = `/company/ledgers/${selectedGroup.name == 'All Groups' ? '' : selectedGroup.name.toLowerCase().replace(/ /g, '-') + '/'}`;
				const response = await axiosInstance.get(apiUrl);
				setRowInformation(response.data);
			} catch (error) {
				toast.error('Error while fetching information');
			}
		})()
		fetchLedgerData(selectedGroup);
	}, [currentCompany, selectedGroup])

	const handleEditClick = async (ledgerId, selectedGroup) => {
		try {
			const apiUrl = `/company/ledgers/${selectedGroup?.name.toLowerCase().replace(/ /g, '-')}/${ledgerId}/`;
			const response = await axiosInstance.get(apiUrl);
			setLedgerData(response.data);
			nameFormik.setFieldValue('name', response.data.name)
			setSelectedGroup(selectedGroup);
			setFormStatus(2);
		} catch (error) {
			console.error('Error fetching ledger data:', error);
		}
	};

	const handleDeleteClick = async (ledgerId, selectedGroup) => {
		try {
			const shouldDelete = window.confirm(`Are you sure you want to delete this ledger?`);
			if (shouldDelete) {
				const group = selectedGroup.name == 'All Groups' ? getGroupByID(ledgerId.split('_')[0].replace('ledger', '')) : selectedGroup
				const apiUrl = `/company/ledgers/${group.name.toLowerCase().replace(/ /g, '-')}/${ledgerId}/`;
				await axiosInstance.delete(apiUrl);
				setSelectedGroup({ ...selectedGroup })
				toast.success(`Ledger is deleted successfully`);
			}
		} catch (error) {
			toast.error('Error while deleting ledger');
		}
	};


	const handleGroupChange = async (event, selectedGroup) => {
		setSelectedGroup(selectedGroup);
		await fetchLedgerData(selectedGroup);
	};


	const handleRequestSort = (event, property) => {
		const isAscending = (valueToOrederBy === property && orderDirection === 'asc')
		setValueToOrederBy(property)
		setOrderDirection(isAscending ? 'desc' : 'asc');
	};


	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1
		}
		if (b[orderBy] > a[orderBy]) {
			return 1
		}
		return 0
	}
	function getComparator(order, orderBy) {
		return order === "desc"
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy)
	}
	const sortedRowInformation = (rowArray, comparator) => {
		const stabilizedRowArray = rowArray.map((ele, index) => [ele, index])
		stabilizedRowArray.sort((a, b) => {
			const order = comparator(a[0], b[0])
			if (order !== 0) return order
			return a[1] - b[1]
		})
		return stabilizedRowArray.map((ele) => ele[0])
	}

	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property)
	}

	const getGroupByID = (id) => groups.find((group) => group.name.toLowerCase().replaceAll(' ', '') == id)
	const [formStatus, setFormStatus] = useState(0)
	useEffect(() => {
		formStatus == 0
	}, [formStatus])
	return (

		< MainCard
			title={
				selectedGroup?.name === 'All Groups'
					? 'Ledgers'
					: formStatus === 1
						? 'Add Ledger'
						: formStatus === 2 && selectedGroup?.name
							? selectedGroup?.name
							: 'Ledgers'
			}
			fetchLedgerData={fetchLedgerData}
			formStatus={formStatus}
			selectedGroup={selectedGroup}
			setFormStatus={setFormStatus}
			setLedgerData={setLedgerData}
		>
			{formStatus === 1 &&
				<NewComponent />
			}

			{
				formStatus === 2 &&
				<>
					{selectedGroup && selectedGroup.form && <selectedGroup.form
						ledgerData={ledgerData} onLedgerUpdate={handleGroupChange} selectedGroup={selectedGroup} setFormStatus={setFormStatus} setLedgerData={setLedgerData} nameFormik={nameFormik} />}

				</>
			}
			{
				formStatus === 0 &&
				<>

					<Grid container>
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
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell key="name" colSpan={4}>
										<TableSortLabel
											active={valueToOrederBy === "name"}
											direction={valueToOrederBy === "name" ? orderDirection : 'asc'}
											onClick={createSortHandler("name")}
										>
											Name
										</TableSortLabel>
									</TableCell>
									{
										selectedGroup.name == 'All Groups' && <TableCell key="group" colSpan={4}>
											<TableSortLabel
												active={valueToOrederBy === "group"}
												direction={valueToOrederBy === "group" ? orderDirection : 'asc'}
												onClick={createSortHandler("group")}
											>
												Group
											</TableSortLabel>
										</TableCell>
									}
									<TableCell key="opening_balance" colSpan={4}>
										<TableSortLabel
											active={valueToOrederBy === "opening_balance"}
											direction={valueToOrederBy === "opening_balance" ? orderDirection : 'asc'}
											onClick={createSortHandler("opening_balance")}
										>
											Opening Balance
										</TableSortLabel>
									</TableCell>
									<TableCell key="current_balance" colSpan={4}>
										<TableSortLabel
											active={valueToOrederBy === "current_balance"}
											direction={valueToOrederBy === "current_balance" ? orderDirection : 'asc'}
											onClick={createSortHandler("current_balance")}
										>
											Current Balance
										</TableSortLabel>
									</TableCell>
									<TableCell key="action" colSpan={4}>
										Action
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									sortedRowInformation(rowInformation, getComparator(orderDirection, valueToOrederBy))
										.map((ledger, index) => (

											<TableRow key={index}>
												<TableCell colSpan={4}>
													{ledger.name}
												</TableCell>
												{
													selectedGroup?.name == 'All Groups' && <TableCell colSpan={4}>
														{
															getGroupByID(ledger.id.split('_')[0].replace('ledger', '')).name
														}
													</TableCell>
												}
												<TableCell colSpan={4}>
													{ledger.opening_balance} {ledger.cr_dr.toUpperCase()}
												</TableCell>
												<TableCell colSpan={4}>
													{ledger.current_balance > 0 ? `${ledger.current_balance} CR` : `${ledger.current_balance * -1} DR`}
												</TableCell>
												<TableCell colSpan={4} sx={{ display: 'flex' }}>
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
														onClick={() => handleEditClick(ledger.id, selectedGroup.name == 'All Groups' ? getGroupByID(ledger.id.split('_')[0].replace('ledger', '')) : selectedGroup)}
														color="inherit"
													>
														<EditOutlinedIcon />
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
														onClick={() => handleDeleteClick(ledger.id, selectedGroup)}
														color="inherit"
													>
														<DeleteOutlineOutlinedIcon />
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
	);
}

