import DefaultLayout from '@/component/Layouts/DefaultLayout';
import Image from 'next/image';
import DashboardPage from './dashboard/page';

export default function Home() {
  return (
    <DefaultLayout>
      <DashboardPage />
    </DefaultLayout>
  );
}
