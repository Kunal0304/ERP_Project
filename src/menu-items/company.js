// assets
import { IconDashboard } from '@tabler/icons';

import {
    Inventory2Outlined,
    SupervisorAccountOutlined,
    CategoryOutlined,
    ExploreOutlined
} from '@mui/icons-material';

// constant
const icons = {
    IconDashboard,
    Inventory2Outlined,
    CategoryOutlined,
    SupervisorAccountOutlined,
    ExploreOutlined
}

const company = {
    id: 'account-info-group',
    type: 'group',
    children: [
        {
            id: 'account-info',
            title: 'Account Info',
            type: 'collapse',
            icon: icons.SupervisorAccountOutlined,
            children: [
                {
                    id: 'ledgers',
                    title: 'Ledgers',
                    type: 'item',
                    url: '/company/ledgers',
                    icon: icons.IconDashboard,
                    breadcrumbs: false
                },
                {
                    id: 'inventory',
                    title: 'Inventory',
                    type: 'collapse',
                    icon: icons.Inventory2Outlined,
                    children: [
                        {
                            id: 'stock-item',
                            title: 'Stock Item',
                            type: 'item',
                            url: '/inventory/stock-item',
                            icon: icons.CategoryOutlined,
                            breadcrumbs: false,
                        },
                    ]

                },
            ]
        },
        // {
        //     id: 'test-page',
        //     title: 'Test Page',
        //     type: 'item',
        //     url: '/test-page',
        //     icon: icons.ExploreOutlined,
        //     breadcrumbs: false,
        // },
    ]
};

export default company;