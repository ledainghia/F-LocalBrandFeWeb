import { authOptions } from '@/lib/authOptions';
import exp from 'constants';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
