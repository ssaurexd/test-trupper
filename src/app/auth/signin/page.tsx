import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
/*  */
import { SigninScreen } from '@/components/screens'
import { authOption } from '@/config'


const SigninPage = async () => {
	const session = await getServerSession( authOption )

	if( session ) redirect( '/' )
	
	return (
		<SigninScreen />
	)
}

export default SigninPage