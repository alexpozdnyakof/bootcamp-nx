import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Box } from '../box'
import { KeyCapturer } from '../key-capturer'
import { Text, TextProps } from '../text'
import styles from './editable-text.module.less'

enum EditableTextMode {
	Idle,
	Edit,
}

export type EditableTextProps = {
	children: string
	onChange?: (newValue: string) => void
	onStartEdit?: () => void
	onCancelEdit?: () => void
	size?: 'body' | 'subtitle'
} & Omit<TextProps, 'size' | 'children'> &
	Pick<TextProps, 'weight'>

export function EditableText({
	children,
	onChange,
	onStartEdit,
	onCancelEdit,
	size: _size = 'body',
	...props
}: EditableTextProps) {
	const [mode, setMode] = useState<EditableTextMode>(EditableTextMode.Idle)
	const inputRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		inputRef.current?.focus()
	}, [mode])
	const setEdit = () => (setMode(EditableTextMode.Edit), onStartEdit?.())
	const setIdle = () => (setMode(EditableTextMode.Idle), onCancelEdit?.())

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		if (event.detail === 2) {
			setEdit()
		}
	}

	const onSubmit = () => {
		const result = inputRef.current?.value as string
		onChange?.(result)
		setIdle()
	}

	const value = children.slice()

	return (
		<KeyCapturer onEscape={setIdle}>
			<Box
				role='switch'
				aria-checked={mode === EditableTextMode.Edit}
				className={[
					styles['editableText'],
					_size !== 'body' ? styles['size-subtitle'] : null,
				]}
				onClick={handleClick}
				tabIndex={0}
			>
				{mode === EditableTextMode.Edit ? (
					<KeyCapturer onEnter={onSubmit}>
						<Box
							as='input'
							className={[styles['editableText-input']]}
							aria-label={`Edit ${value}`}
							defaultValue={value}
							ref={inputRef}
							onBlur={setIdle}
						/>
					</KeyCapturer>
				) : (
					<Text {...props} size={_size}>
						{value}
					</Text>
				)}
			</Box>
		</KeyCapturer>
	)
}

export default EditableText
