import {
	Box,
	TextField,
	Portal,
	Text,
	ListItem,
	List,
	Toolbar,
} from '@bootcamp-nx/core-ui'
import { useEffect, useRef, useState } from 'react'
import searchSlice, { selectSearchResult } from '../slices/search.slice'
import { useAppDispatch, useAppSelector } from '../store-hooks'

export function Search() {
	const [search, setSearch] = useState<string>('')
	const [position, setPosition] = useState<{
		top: number
		left: number
		width: number
	} | null>(null)
	const dispatch = useAppDispatch()
	const ref = useRef<HTMLInputElement>(null)

	const searchResult = useAppSelector(selectSearchResult)

	useEffect(() => {
		const getNewPosition = () => {
			const rect = ref.current?.getBoundingClientRect()
			return {
				top: rect ? Number(rect.top) + Number(rect.height) + 10 : 0,
				left: rect ? Number(rect.left) : 0,
				width: rect ? rect.width : 0,
			}
		}

		setPosition(getNewPosition())

		window.addEventListener('resize', () => {
			setPosition(getNewPosition())
		})

		return () =>
			window.removeEventListener('resize', () => {
				setPosition(getNewPosition())
			})
	}, [])

	const startSearch = (title: string) => {
		dispatch(searchSlice.actions.search({ title }))
	}

	return (
		<>
			<Box width='full'>
				<TextField
					name='search'
					ref={ref}
					type='text'
					placeholder='Search'
					value={search}
					onChange={e => (
						setSearch(e.target.value), startSearch(e.target.value)
					)}
				/>
			</Box>
			{search && (
				<Portal>
					<Box
						background='default'
						padding='medium'
						position='fixed'
						style={{
							width: position?.width ?? 0,
							zIndex: 100,
							top: position?.top ?? 0,
							left: position?.left ?? 0,
							background: 'rgba(29, 29, 29, 0.2)',
							border: '1px solid rgba(40, 40, 40, 0.8)',
							backdropFilter: 'saturate(180%) blur(20px)',
						}}
					>
						<List>
							{searchResult.map(item => (
								<ListItem key={`${item.type}_${item.id}`}>
									<Toolbar>
										<Box flexGrow={1}>
											<Text>{item.title}</Text>
										</Box>
										<Text>{item.type}</Text>
									</Toolbar>
								</ListItem>
							))}
						</List>
					</Box>
				</Portal>
			)}
		</>
	)
}
