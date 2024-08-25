import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import CompanyLedger from 'views/Company/Ledgers';
import StockItem from 'views/Inventory/StockItem';
import PaymentVoucher from 'views/Voucher/_2_PaymentVoucher';
import ReceiptVoucher from 'views/Voucher/_1_ReceiptVoucher';
import JournalVoucher from 'views/Voucher/_3_JournalVoucher';
import StockJournalVoucher from 'views/Voucher/_4_StockJournalVoucher';
import PurchaseOrderVoucher from 'views/Voucher/_5_PurchaseOrderVoucher';
import TestPage from 'views/TestPage';
import PurchaseVoucher from 'views/Voucher/_6_PurchaseVoucher';
import SalesOrderVoucher from 'views/Voucher/_7_SalesOrderVoucher';
import SalesVoucher from 'views/Voucher/_8_SalesVoucher';
import SalesReturnVoucher from 'views/Voucher/_9_SalesReturnVoucher';
import PurchaseReturnVoucher from 'views/Voucher/_10_PurchaseReturnVoucher';
import SalesRegister from 'views/Reports/_4_SalesRegister';
import PurchaseRegister from 'views/Reports/_5_PurchaseRegister';
import LedgerReport from 'views/Reports/_1_LedgerReport';
import BalanceSheet from 'views/Reports/_2_BalanceSheet';
import ProfitAndLoss from 'views/Reports/_3_ProfitAndLoss';
import Ticket from 'views/Support/Ticket';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '/',
			element: <DashboardDefault />
		},
		{
			path: 'dashboard',
			children: [
				{
					path: 'default',
					element: <DashboardDefault />
				}
			]
		},
		{
			path: 'company',
			children: [
				// {
				// 	path: 'group',
				// 	element: <CompanyGroup />
				// },
				{
					path: 'ledgers',
					element: <CompanyLedger />
				},
			]
		},
		{
			path: 'inventory',
			children: [
				{
					path: 'stock-item',
					element: <StockItem />
				},
			]
		},
		{
			path: 'voucher',
			children: [
				{
					path: 'receipt',
					element: <ReceiptVoucher />
				},
				{
					path: 'payment-voucher',
					element: <PaymentVoucher />
				},
				{
					path: 'journal',
					element: <JournalVoucher />
				},
				{
					path: 'stock-journal',
					element: <StockJournalVoucher />
				},
				{
					path: 'purchase-order',
					element: <PurchaseOrderVoucher />
				},
				{
					path: 'purchase',
					element: <PurchaseVoucher />
				},
				{
					path: 'sales-order',
					element: <SalesOrderVoucher />
				},
				{
					path: 'sales',
					element: <SalesVoucher />
				},
				{
					path: 'sales-return',
					element: <SalesReturnVoucher />
				},
				{
					path: 'purchase-return',
					element: <PurchaseReturnVoucher />
				},
			]
		},
		{
			path: 'reports',
			children: [
				{
					path: 'ledger-report',
					element: <LedgerReport />
				},
				{
					path: 'balance-sheet',
					element: <BalanceSheet />
				},
				{
					path: 'profit-loss',
					element: <ProfitAndLoss />
				},
				{
					path: 'sales-register',
					element: <SalesRegister />
				},
				{
					path: 'purchase-register',
					element: <PurchaseRegister />
				},
			]
		},
		{
			path: 'support',
			children: [
				{
					path: 'ticket',
					element: <Ticket />
				}
			]
		},
		{
			path: 'test-page',
			element: <TestPage />
		},
	]
};

export default AdminRoutes;
