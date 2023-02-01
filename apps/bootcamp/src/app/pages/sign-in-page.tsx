import { Box } from '@bootcamp-nx/core-ui'
import { SignInForm } from '../process/auth'

export default function SignInPage() {
	return (
		<Box
			width='full'
			height='full'
			style={{ height: '100vh' }}
			display='flex'
			alignItems='center'
			justifyContent='center'
		>
			<Box width='small' alignItems='center'>
				<SignInForm />
			</Box>
		</Box>
	)
}
