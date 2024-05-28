export type SidebarType = {
  title: string;
  isHeader: boolean;
  path?: string;
  icon?: JSX.Element;
  children?: {
    title: string;
    path: string;
  }[];
};
