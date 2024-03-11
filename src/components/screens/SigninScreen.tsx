'use client'
import { FC, useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import '../../styles/signin-page.css'
/*  */
import { Button, InputText } from '@/components'


interface Props {
	
}
export const SigninScreen: FC<Props> = () => {
	const router = useRouter()
	const [ msgError, setMsgError ] = useState( '' )
	const [ userValues, setUserValues ] = useState({
		email: '',
		password: ''
	})
	const [ fieldErrors, setFieldErrors ] = useState({
		email: '',
		password: ''
	})

	const handleOnChange = ( e: ChangeEvent<HTMLInputElement> ) => {
		setUserValues( preState => {
			return {
				...preState,
				[e.target.name]: e.target.value
			}
		})
	}

	const handleOnSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
		e.preventDefault()
		const hasErrors = formHasErrors( userValues )

		if( hasErrors ) return
		
		const resp = await signIn('credentials', {
			email: userValues.email,
			password: userValues.password,
			redirect: false,
			callbackUrl: '/'
		})
		if( resp?.ok )  return router.refresh()
		
		setMsgError('Correo Electronico y/o Contraseña incorrectos')
	}

	const formHasErrors = ( values: { email: string, password: string } ) => {
		const { email, password } = values
		let hasErros = false

		if( email.trim() === '' ) {
			hasErros = true
			setFieldErrors( preState => ({
				...preState,
				email: 'El campo es obligatorio'
			}))
		}

		if( password.trim() === '' ) {
			hasErros = true
			setFieldErrors( preState => ({
				...preState,
				password: 'El campo es obligatorio'
			}))
		}

		return hasErros
	}

	return (
		<main className='main-signin-page'>
			<h1>Iniciar Sesión</h1>
			<form onSubmit={ handleOnSubmit }
				className='main-signin-page__form'
			>
				{ msgError &&
					<p className='main-signin-page__error-msg' >{ msgError }</p>
				}
				<InputText 
					placeholader='Corres Electronico'
					value={ userValues.email }
					name='email'
					onChange={ handleOnChange }
					label='Correo Electronico'
					error={ fieldErrors.email  }
				/>

				<InputText 
					placeholader='Contraseña'
					value={ userValues.password }
					name='password'
					type='password'
					onChange={ handleOnChange }
					label='Ingresa tu contraseña'
					error={ fieldErrors.password  }
				/>

				<Button 
					type='submit'
				>
					Iniciar Sesión
				</Button>
			</form>
		</main>
	)
}