import Link from 'next/link';
import React, { useState } from 'react';
import { LuLayoutDashboard } from 'react-icons/lu';
import SidebarLinkGroup from '../SidebarLinkGroup';
import { usePathname } from 'next/navigation';
import { SidebarType } from '@/dataType/sidebarType';
import { SidebarProps } from '..';
type SidebarItemProps = {
  sidebarData: SidebarType;
};
export default function SidebarItem(sidebarData: SidebarItemProps) {
  const pathname = usePathname();

  let storedSidebarExpanded = 'false';

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  if (!sidebarData) return null;
  else if (sidebarData.sidebarData.isHeader)
    return (
      <>
        <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>
          {sidebarData.sidebarData.title.toUpperCase()}
        </h3>
      </>
    );
  else if (
    sidebarData.sidebarData.children &&
    sidebarData.sidebarData.children.length > 0
  )
    return (
      <>
        <ul className='mb-1 flex flex-col gap-1.5'>
          <SidebarLinkGroup activeCondition={false}>
            {(handleClick, open) => {
              return (
                <React.Fragment>
                  <Link
                    href='#'
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark hover:text-hightlightColor dark:hover:bg-meta-4 ${
                      pathname &&
                      pathname.includes('dashboard') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    {sidebarData.sidebarData.icon}

                    {sidebarData.sidebarData.title}
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && 'rotate-180'
                      }`}
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z'
                        fill=''
                      />
                    </svg>
                  </Link>
                  {/* <!-- Dropdown Menu Start --> */}
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && 'hidden'
                    }`}
                  >
                    <ul className='mb-5.5 mt-4 flex flex-col gap-2.5 pl-6'>
                      {sidebarData.sidebarData.children?.map(
                        (subItem, index) => (
                          <li key={index}>
                            <Link
                              href={subItem.path}
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/' ||
                                (pathname === subItem.path &&
                                  'text-white bg-graydark dark:bg-meta-4')
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  {/* <!-- Dropdown Menu End --> */}
                </React.Fragment>
              );
            }}
          </SidebarLinkGroup>
        </ul>
      </>
    );
  else
    return (
      <ul className='mb-6 flex flex-col gap-1.5'>
        <li>
          <Link
            href={`${sidebarData.sidebarData.path}`}
            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark hover:text-hightlightColor dark:hover:bg-meta-4 ${
              sidebarData.sidebarData.path === '' ||
              (pathname?.includes(sidebarData.sidebarData.path!) &&
                'bg-graydark dark:bg-meta-4')
            }`}
          >
            {sidebarData.sidebarData.icon}
            {sidebarData.sidebarData.title}
          </Link>
        </li>
      </ul>
    );
}
