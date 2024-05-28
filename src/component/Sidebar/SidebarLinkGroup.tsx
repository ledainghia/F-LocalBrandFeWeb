'use client';
import { ReactNode, useState } from 'react';

interface SidebarLinkGroupProps {
  children: (
    handleClick: () => void,
    open: boolean | null | undefined
  ) => ReactNode;
  activeCondition: boolean | null | undefined;
}

const SidebarLinkGroup = ({
  children,
  activeCondition,
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean | null | undefined>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
