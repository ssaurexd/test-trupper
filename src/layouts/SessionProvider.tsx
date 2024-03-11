'use client'
import { FC } from 'react'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'


interface Props {
	children: React.ReactNode
}
export const SessionProvider: FC<Props> = ({ children }) => {

	return (
		<NextAuthSessionProvider>
			{ children }
		</NextAuthSessionProvider>
	)
}