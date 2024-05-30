'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import SidebarLinkGroup from './SidebarLinkGroup';
import { SidebarType } from '@/dataType/sidebarType';
import { LuLayoutDashboard } from 'react-icons/lu';
import SidebarItem from './componemts/SidebarItem';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaFileInvoiceDollar,
  FaWarehouse,
  FaTruck,
  FaBullhorn,
  FaFileAlt,
  FaChartLine,
  FaUserShield,
  FaCogs,
} from 'react-icons/fa';

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const sidebarData: SidebarType[] = [
  {
    title: 'Dashboard',
    isHeader: false,
    path: '/dashboard',
    icon: <FaTachometerAlt />,
  },
  {
    title: 'MANAGEMENT',
    isHeader: true,
  },
  {
    title: 'Product Management',
    isHeader: false,
    icon: <FaBoxOpen />,
    children: [
      {
        title: 'Products',
        path: '/products',
      },
      {
        title: 'Categories',
        path: '/categories',
      },
      {
        title: 'Inventory',
        path: '/inventory',
      },
      {
        title: 'Promotions',
        path: '/promotions',
      },
    ],
  },
  {
    title: 'Order Management',
    isHeader: false,
    icon: <FaShoppingCart />,
    children: [
      {
        title: 'Orders',
        path: '/orders',
      },
      {
        title: 'Shipping Status',
        path: '/shipping-status',
      },
      {
        title: 'Returns & Cancellations',
        path: '/returns-cancellations',
      },
    ],
  },
  {
    title: 'Customer Management',
    isHeader: false,
    icon: <FaUsers />,
    children: [
      {
        title: 'Customers',
        path: '/customers',
      },
      {
        title: 'Customer Accounts',
        path: '/customer-accounts',
      },
    ],
  },
  {
    title: 'Financial Management',
    isHeader: false,
    icon: <FaFileInvoiceDollar />,
    children: [
      {
        title: 'Invoices & Payments',
        path: '/invoices-payments',
      },
      {
        title: 'Financial Reports',
        path: '/financial-reports',
      },
    ],
  },
  {
    title: 'Inventory Management',
    isHeader: false,
    icon: <FaWarehouse />,
    children: [
      {
        title: 'Stock Entries',
        path: '/stock-entries',
      },
      {
        title: 'Low Stock Alerts',
        path: '/low-stock-alerts',
      },
    ],
  },
  {
    title: 'Supplier Management',
    isHeader: false,
    icon: <FaTruck />,
    children: [
      {
        title: 'Suppliers',
        path: '/suppliers',
      },
      {
        title: 'Contracts & Transactions',
        path: '/contracts-transactions',
      },
      {
        title: 'Supplier Orders',
        path: '/supplier-orders',
      },
    ],
  },
  {
    title: 'Marketing Management',
    isHeader: false,
    icon: <FaBullhorn />,
    children: [
      {
        title: 'Marketing Campaigns',
        path: '/marketing-campaigns',
      },
      {
        title: 'Discount Codes',
        path: '/discount-codes',
      },
      {
        title: 'Campaign Effectiveness',
        path: '/campaign-effectiveness',
      },
    ],
  },
  {
    title: 'Content Management',
    isHeader: false,
    icon: <FaFileAlt />,
    children: [
      {
        title: 'Informational Pages',
        path: '/informational-pages',
      },
      {
        title: 'Blog & News',
        path: '/blog-news',
      },
      {
        title: 'Images & Videos',
        path: '/images-videos',
      },
    ],
  },
  {
    title: 'Reports and Analytics',
    isHeader: false,
    icon: <FaChartLine />,
    children: [
      {
        title: 'Sales Reports',
        path: '/sales-reports',
      },
      {
        title: 'Customer Analysis',
        path: '/customer-analysis',
      },
      {
        title: 'Product Reports',
        path: '/product-reports',
      },
    ],
  },
  {
    title: 'User and Access Management',
    isHeader: false,
    icon: <FaUserShield />,
    children: [
      {
        title: 'Admin & Staff Accounts',
        path: '/admin-staff-accounts',
      },
      {
        title: 'Access Permissions',
        path: '/access-permissions',
      },
      {
        title: 'Activity Logs',
        path: '/activity-logs',
      },
    ],
  },
  {
    title: 'SYSTEM',
    isHeader: true,
  },
  {
    title: 'System Configuration',
    isHeader: false,
    icon: <FaCogs />,
    children: [
      {
        title: 'Store Settings',
        path: '/store-settings',
      },
      {
        title: 'Email & SMS Settings',
        path: '/email-sms-settings',
      },
      {
        title: 'Payment Methods',
        path: '/payment-methods',
      },
      {
        title: 'Shipping & Delivery Fees',
        path: '/shipping-delivery-fees',
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = 'true';

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute border-r left-0 top-0 z-9999 bg-black flex h-screen w-80 flex-col overflow-y-hidden  duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='flex items-center justify-between lg:justify-center gap-2 px-6 py-5.5 lg:py-6.5'>
        <Image
          width={176}
          height={32}
          src={'/images/logo/logo.svg'}
          alt='Logo'
          priority
        />

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='text-white block lg:hidden'
        >
          <svg
            className='fill-current'
            width='20'
            height='18'
            viewBox='0 0 20 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
              fill=''
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        {/* <!-- Sidebar Menu --> */}
        <nav className='mt-5 px-4 py-4 lg:mt-9 lg:px-6'>
          {/* <!-- Menu Group --> */}
          <div>
            {/* <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>
              MENU
            </h3> */}
            {sidebarData.map((item, index) => (
              <SidebarItem key={index} sidebarData={item}></SidebarItem>
            ))}
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
