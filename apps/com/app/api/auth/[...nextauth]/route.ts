import NextAuth from 'next-auth';
import { mystiquillAuthOptions } from '@/packages/lib/auth';

const handler = NextAuth(mystiquillAuthOptions);

export { handler as GET, handler as POST };