import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOption: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				const { email, password } = credentials as any

				if( password === '1234' && email === 'ejemplo@ejemplo.com' ) {
					// al no tener una DB vamos a mockear un usuario
					const userToReturn = {
						id: '1',
						name: 'Aure Sandoval',
						email: 'ejemplo@ejemplo.com',
						image: 'https://placehold.co/400'
					}
					return userToReturn
				}
				
				return null
			}
		})
	],
	callbacks: {
		jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }: { session: any, token: any }) => {
      session.user = token.user;  // Setting token in session
      return session;
    },
	},
	pages: {
		signIn: '/auth/signin'
	}
}