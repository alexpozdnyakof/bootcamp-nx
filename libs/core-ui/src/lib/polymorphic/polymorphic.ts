import { ComponentProps, forwardRef } from 'react'

type Merge<P1, P2> = Omit<P1, keyof P2> & P2

type EmptyObject = {
	[K in any]: never
}

type ElementTagNameMap = HTMLElementTagNameMap &
	Pick<
		SVGElementTagNameMap,
		Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>
	>

type ElementByTag<TagName extends keyof ElementTagNameMap> =
	ElementTagNameMap[TagName]

type ElementByTagOrAny<ComponentType extends React.ElementType> =
	ComponentType extends keyof ElementTagNameMap
		? ElementByTag<ComponentType>
		: any

type PolymorphicProp<ComponentType extends React.ElementType> = {
	as?: ComponentType
}
type PolymorphicProps<
	ComponentType extends React.ElementType,
	OwnProps
> = Merge<
	Omit<ComponentProps<ComponentType>, 'className'>,
	PolymorphicProp<ComponentType> & Partial<OwnProps>
>

interface PolymorphicComponent<
	ComponentType extends React.ElementType,
	OwnProps
> {
	<TT extends React.ElementType = ComponentType>(
		props: PolymorphicProps<TT, OwnProps>
	): React.ReactElement | null
	readonly $$typeof: symbol
	defaultProps?: Partial<PolymorphicProps<ComponentType, OwnProps>>
	propTypes?: React.WeakValidationMap<
		PolymorphicProps<ComponentType, OwnProps>
	>
	displayName?: string
}

interface ForwardRefFunction<
	ComponentType extends React.ElementType,
	OwnProps
> {
	(
		props: PolymorphicProps<ComponentType, OwnProps>,
		ref:
			| ((instance: ElementByTagOrAny<ComponentType> | null) => void)
			| React.MutableRefObject<ElementByTagOrAny<ComponentType> | null>
			| null
	): React.ReactElement | null
	displayName?: string
}

function polymorphicComponent<
	ComponentType extends React.ElementType = 'div',
	OwnProps = EmptyObject
>(render: ForwardRefFunction<ComponentType, OwnProps>) {
	return forwardRef(render) as PolymorphicComponent<ComponentType, OwnProps>
}

export { polymorphicComponent }
