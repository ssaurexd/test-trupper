import NextAuth from "next-auth"
import { authOption } from '@/config'


const handler = NextAuth( authOption )

export { handler as GET, handler as POST }