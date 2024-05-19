'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { primaryColor } from '@/helper/style';
import { cn } from '@/lib/utils';
import { CiMail } from 'react-icons/ci';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function handleSignInWithGoogle(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    signIn('google');
  }

  const { data: session } = useSession();
  console.log(session);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <div className='mb-12'>
          <h3 className='text-3xl font-extrabold'>Sign in</h3>
          <p className='text-sm mt-4 '>
            Don&apos;t have an account{' '}
            {session && session.user ? (
              <div className='flex gap-4 ml-auto'>
                <p className='text-sky-600'>{session.user.name}</p>
                <button onClick={() => signOut()} className='text-red-600'>
                  Sign Out
                </button>
              </div>
            ) : null}
            <Link
              href='/auth/register'
              className=' font-semibold hover:underline ml-1 whitespace-nowrap'
              style={{ color: primaryColor }}
            >
              Register here
            </Link>
          </p>
        </div>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username or mail</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input placeholder='Enter username or mail' {...field} />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 '>
                    <CiMail />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='Enter password'
                    type={isPasswordVisible ? 'text' : 'password'}
                    {...field}
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'>
                    <button
                      type='button'
                      onClick={togglePasswordVisibility}
                      className='focus:outline-none'
                    >
                      {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center space-x-2 '>
            <Checkbox className='rounded' />
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Remember me
            </label>
          </div>
          <div>
            <a
              className={cn(' font-semibold text-sm hover:opacity-50 ')}
              style={{ color: primaryColor }}
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <Button
          type='submit'
          className={cn(
            'w-full shadow-xl py-2.5 px-4 text-sm font-semibold  text-white  focus:outline-none'
          )}
        >
          Sign in
        </Button>
        <p className='my-8 text-sm text-gray-400 text-center'>
          or continue with
        </p>
        <div className='flex justify-center'>
          <Button
            onClick={handleSignInWithGoogle}
            variant='outline'
            className='gap-2 w-full'
          >
            <FcGoogle size={20} />
            Sign in with Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
