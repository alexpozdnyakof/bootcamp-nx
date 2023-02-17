/* eslint-disable react/jsx-props-no-spreading */
import { Button, Icon, Modal, Stack, TextField } from '@bootcamp-nx/core-ui'
import { useVanillaForm } from '@bootcamp-nx/use-vanilla-form'
import { observer } from 'mobx-react-lite'
import { FormEvent, useRef, useState } from 'react'
import { useStore } from '../stores'

type NewProjectFormState = {
	title: string
	description: string | undefined
}
const AddProject = observer(() => {
	const [isOpen, setOpen] = useState<boolean>(false)
	const { projectStore } = useStore()

	const ref = useRef<HTMLFormElement>(null)

	const { handleSubmit, errors, formControl, resetErrors } =
		useVanillaForm<NewProjectFormState>()

	const toggleModal = () => setOpen(o => !o)

	const submitFn = (state: NewProjectFormState) => {
		projectStore.add(state)
		toggleModal()
	}

	return (
		<>
			<Button size='small' variant='quaternary' onClick={toggleModal}>
				<Icon size='small' tone='secondary'>
					add
				</Icon>
			</Button>
			{isOpen && (
				<Modal
					onClose={() => (toggleModal(), resetErrors())}
					width='small'
					title='新しいプロジェクトを追加'
					buttons={
						<>
							<Button
								onClick={() => {
									ref.current?.requestSubmit()
								}}
							>
								プロジェクトを作成
							</Button>
							<Button
								variant='secondary'
								onClick={() => (toggleModal(), resetErrors())}
							>
								キャンセル
							</Button>
						</>
					}
				>
					<Stack
						as='form'
						space='large'
						ref={ref}
						onSubmit={(event: FormEvent) =>
							handleSubmit(submitFn)(event)
						}
						noValidate
					>
						<TextField
							label='プロジェクト名'
							{...formControl('title', { required: true })}
							tone={errors.title ? 'error' : 'neutral'}
							message={errors.title}
						/>
						<TextField
							label='プロジェクトの説明'
							{...formControl('description')}
							tone={errors.description ? 'error' : 'neutral'}
							message={errors.description}
						/>
					</Stack>
				</Modal>
			)}
		</>
	)
})

export default AddProject
