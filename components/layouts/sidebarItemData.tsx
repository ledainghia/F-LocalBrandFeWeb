import IconMenuUsers from '@/components/icon/menu/icon-menu-users';
import { AiFillProduct } from 'react-icons/ai';
import { BiSolidCategory } from 'react-icons/bi';
import { FaUsersGear } from 'react-icons/fa6';
import { MdBorderBottom, MdCampaign, MdOutlineDeliveryDining } from 'react-icons/md';
import { BsCollectionFill } from 'react-icons/bs';
// Define the type for a sidebar item
export type sidebarItem = {
    title: string;
    isHeader: boolean;
    subMenu?: SubMenuItem[];
    path?: string;
};

// Define the type for a sub-menu item
export type SubMenuItem = {
    title: string;
    icon: JSX.Element;
    path: string;
};

// Define class names for the icon in the sidebar
export const classNamesForIconSidebar: string = 'shrink-0 group-hover:!text-primary';

// Define the sidebar item data
export const sidebarItemData: sidebarItem[] = [
    {
        title: 'Dashboard',
        isHeader: false,
        path: '/',
    },
    {
        title: 'Management',
        isHeader: true,
        subMenu: [
            {
                title: 'Users',
                icon: <IconMenuUsers className={classNamesForIconSidebar} />,
                path: '/management/users',
            },
            {
                title: 'Customers',
                icon: <FaUsersGear className={classNamesForIconSidebar} />,
                path: '/management/customers',
            },
            {
                title: 'Delivers',
                icon: <MdOutlineDeliveryDining className={classNamesForIconSidebar} />,
                path: '/management/delivers',
            },
            {
                title: 'Products',
                icon: <AiFillProduct className={classNamesForIconSidebar} />,
                path: '/management/products',
            },
            {
                title: 'Collections',
                icon: <BsCollectionFill className={classNamesForIconSidebar} />,
                path: '/management/collections',
            },
            {
                title: 'Campaigns',
                icon: <MdCampaign className={classNamesForIconSidebar} />,
                path: '/management/campaigns',
            },
            {
                title: 'Categories',
                icon: <BiSolidCategory className={classNamesForIconSidebar} />,
                path: '/management/categories',
            },
            {
                title: 'Orders',
                icon: <MdBorderBottom className={classNamesForIconSidebar} />,
                path: '/management/orders',
            },
        ],
    },
    {
        title: 'Settings',
        isHeader: true,
        subMenu: [
            {
                title: 'General',
                icon: <MdBorderBottom className={classNamesForIconSidebar} />,
                path: '/settings/general',
            },
        ],
    },
];
