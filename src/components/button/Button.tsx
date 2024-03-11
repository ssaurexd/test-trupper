import { FC, ReactNode } from 'react'
import './button.css'


interface Props {
	children: ReactNode
	onClick?: () => void
	type: 'button' | 'submit'
}
export const Button: FC<Props> = ({ children, ...props }) => {

	return (
		<button
			className='btn'
			{ ...props }
		>
			{ children }
		</button>
	)
}