// assets
import {
    ReceiptOutlined,
    CardTravelOutlined,
    DiscountOutlined
} from '@mui/icons-material';

// constant
const icons = {
    ReceiptOutlined,
    CardTravelOutlined,
    DiscountOutlined
};

const support = {
    id: 'support-group',
    type: 'group',
    children: [
        {
            id: 'support',
            title: 'Support',
            type: 'collapse',
            icon: icons.DiscountOutlined,
            children: [
                {
                    id: 'ticket',
                    title: 'Tickets',
                    type: 'item',
                    url: '/support/ticket',
                    icon: icons.ReceiptOutlined,
                    breadcrumbs: false
                },
            ]
        }
    ]
};

export default support;
