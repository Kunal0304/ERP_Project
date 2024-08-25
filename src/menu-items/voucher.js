// assets
import {
    PaymentOutlined,
    ReceiptOutlined,
    CardTravelOutlined,
    DiscountOutlined,
    CasesOutlined
} from '@mui/icons-material';

// constant
const icons = {
    PaymentOutlined,
    ReceiptOutlined,
    CardTravelOutlined,
    DiscountOutlined,
    CasesOutlined
};

const voucher = {
    id: 'vouchers-group',
    type: 'group',
    children: [
        {
            id: 'voucher',
            title: 'Vouchers',
            type: 'collapse',
            icon: icons.DiscountOutlined,
            children: [
                {
                    id: 'receipt',
                    title: 'Receipt',
                    type: 'item',
                    url: '/voucher/receipt',
                    icon: icons.ReceiptOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'payment',
                    title: 'Payment',
                    type: 'item',
                    url: '/voucher/payment-voucher',
                    icon: icons.PaymentOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'journal',
                    title: 'Journal',
                    type: 'item',
                    url: '/voucher/journal',
                    icon: icons.CardTravelOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'stock-journal',
                    title: 'Stock Journal',
                    type: 'item',
                    url: '/voucher/stock-journal',
                    icon: icons.CasesOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'purchase-order',
                    title: 'Purchase Order',
                    type: 'item',
                    url: '/voucher/purchase-order',
                    icon: icons.CasesOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'purchase',
                    title: 'Purchase',
                    type: 'item',
                    url: '/voucher/purchase',
                    svg: '/images/purchase.svg',
                    breadcrumbs: false
                },
                {
                    id: 'sales-order',
                    title: 'Sales Order',
                    type: 'item',
                    url: '/voucher/sales-order',
                    icon: icons.CasesOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'sales',
                    title: 'Sales',
                    type: 'item',
                    url: '/voucher/sales',
                    icon: icons.CasesOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'sales-return',
                    title: 'Sales Return',
                    type: 'item',
                    url: '/voucher/sales-return',
                    icon: icons.CasesOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'purchase-return',
                    title: 'Purchase Return',
                    type: 'item',
                    url: '/voucher/purchase-return',
                    icon: icons.CasesOutlined,
                    breadcrumbs: false
                },

            ]
        }
    ]
};

export default voucher;
