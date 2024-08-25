// assets
import {
    PaymentOutlined,
    ReceiptOutlined,
    CardTravelOutlined,
    DiscountOutlined,
    CasesOutlined,
    EqualizerOutlined,
    MonetizationOnOutlined
} from '@mui/icons-material';

// constant
const icons = {
    PaymentOutlined,
    ReceiptOutlined,
    CardTravelOutlined,
    DiscountOutlined,
    CasesOutlined,
    EqualizerOutlined,
    MonetizationOnOutlined
};

const reports = {
    id: 'reports-group',
    type: 'group',
    children: [
        {
            id: 'reports',
            title: 'Reports',
            type: 'collapse',
            icon: icons.EqualizerOutlined,
            children: [
                {
                    id: 'ledger-report',
                    title: 'Ledger Report',
                    type: 'item',
                    url: '/reports/ledger-report',
                    icon: icons.MonetizationOnOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'balance-sheet',
                    title: 'Balance Sheet',
                    type: 'item',
                    url: '/reports/balance-sheet',
                    icon: icons.MonetizationOnOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'profit-loss',
                    title: 'Profit & Loss',
                    type: 'item',
                    url: '/reports/profit-loss',
                    icon: icons.MonetizationOnOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'sales-register',
                    title: 'Sales Register',
                    type: 'item',
                    url: '/reports/sales-register',
                    icon: icons.MonetizationOnOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'purchase-register',
                    title: 'Purchase Register',
                    type: 'item',
                    url: '/reports/purchase-register',
                    icon: icons.MonetizationOnOutlined,
                    breadcrumbs: false
                },
            ]
        }
    ]
};

export default reports;
