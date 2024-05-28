'use client';

import { LoginForm } from '@/component/loginForm/loginForm';
import { primaryColor } from '@/helper/style';

export default function page() {
  return (
    <>
      <div className='font-[sans-serif] text-[#333]'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 items-center lg:gap-8 gap-4 h-full'>
          <div
            className='max-md:order-1 lg:col-span-2 md:h-screen w-full  md:rounded-tr-xl md:rounded-br-xl lg:p-12 p-8'
            style={{ background: primaryColor }}
          >
            <iframe
              className='lg:w-[70%] w-full h-full object-contain block mx-auto'
              src='https://lottie.host/embed/720d4744-b3d9-43ec-b75c-8344e3d47631/GEPKuYWchj.lottie'
            ></iframe>
          </div>
          <div className='w-full p-6'>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
