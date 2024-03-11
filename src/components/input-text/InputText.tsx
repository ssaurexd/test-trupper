import { FC, ChangeEvent, ReactNode } from 'react'
import './input-text.css'


interface Props {
	placeholader: string
	value: string
	onChange: ( e: ChangeEvent<HTMLInputElement> ) => void
	name: string
	label: string
	error?: string
	type?: 'text' | 'password'
	id?: string
}
export const InputText: FC<Props> = ({ label, error, type = 'text', id, ...props }) => {

	return (
		<div className='input-text__container'>
			<label htmlFor={ id }>{ label }</label>
			<input 
				id={ id }
				type={ type }
				className='input-text'
				{ ...props }
			/>
			{ error &&
				<p className='input-text__error-msg' >{ error }</p>
			}
		</div>
	)
}