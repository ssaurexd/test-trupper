import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
/*  */
import { authOption } from '@/config'
import { HomeScreen } from '@/components/screens'


const Home = async () => {
  const session = await getServerSession( authOption )

  if( !session ) return redirect('auth/signin')

  return (
    <HomeScreen />
  )
}

export default Home
