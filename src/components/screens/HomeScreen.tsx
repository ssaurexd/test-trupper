'use client'
import { FC, useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
/*  */
import { api } from '@/config'
import { IAPIResponse, Result } from '@/interfaces'
import { Button } from '..'


interface Props {
	
}
export const HomeScreen: FC<Props> = () => {
	const [ data, setData ] = useState<Result[]>( [] ) 
	const [ page, setPage ] = useState( 1 )
	const [ isLoading, setIsLoading ] = useState( true )
	const [ isLoadingMore, setIsLoadingMore ] = useState( false )

	/* functions */
	const handleOnLogout = () => {
		signOut()
	}

	/* aggrega mas data al state de data */
	const onAddMoreData = async (  ) => {
		setIsLoadingMore( true )

		try {
			const nextPage = page + 1
			const { data } = await api.get<IAPIResponse>(`/?page=${ nextPage }`)
			setData( preState => {
				return [
					...preState,
					...data.results
				]
			})
			setPage( nextPage )
			setIsLoadingMore( false )
		} catch ( error ) {
			setIsLoadingMore( false )
		}
	}

	/* effects */
	/* Al montarse el componente hacemos el fetch */
	useEffect( () => {
		( async () => {
			try {
				const { data } = await api.get<IAPIResponse>('/')
				setData( data.results )
				setIsLoading( false )
			} catch ( error ) {
				console.log("🚀 ~ error:", error)
				setIsLoading( false )
			}
		})()
	}, [ ])

	if( isLoading ) return <h1>Cargando...</h1>

	return (
		<main className='main-home'>
			<div>
				<Button
					type='button'
					onClick={ handleOnLogout }
				>
					cerrar session
				</Button>
			</div>
			{ data.map( item => (
				<div key={item._id} className='main-home__item-container'>
					<p>{ item._id }</p>
					{ item.stations.map( station => (
						<div key={ station.id } className='main-home__item-container-station'>
							<p> ID: { station.id } - { station.name }</p>
						</div>
					))}
				</div>
			))}
			<div>
				{
					isLoadingMore 
						? <p>Cargando mas datos...</p>
						: (
							<Button
								onClick={ onAddMoreData }
								type='button'
							>
								ver mas
							</Button>
						)
				}	
			</div>
		</main>
	)
}