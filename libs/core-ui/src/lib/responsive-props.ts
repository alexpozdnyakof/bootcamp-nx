type ResponsiveBreakpoints = 'mobile' | 'tablet' | 'desktop'
type Atom = string | number | boolean

type ResponsiveProp<AtomType extends Atom> =
	| AtomType
	| Readonly<{ [key in ResponsiveBreakpoints]?: AtomType }>

function getClassNames(
	styles: Record<string, string>,
	property: string,
	value: ResponsiveProp<string> | null | undefined
): Array<string> | null {
	if (!value) return null

	const classList: Array<string> = []

	if (typeof value == 'string') {
		classList.push(styles[`${property}-${value}`])
	} else {
		if (value.mobile) classList.push(styles[`${property}-${value.mobile}`])
		if (value.tablet)
			classList.push(styles[`tablet-${property}-${value.tablet}`])
		if (value.desktop)
			classList.push(styles[`desktop-${property}-${value.desktop}`])
	}

	return classList
}

function mapResponsiveProp<From extends Atom, To extends Atom>(
	fromValue: ResponsiveProp<From> | undefined,
	mapper: (from: From) => To
): ResponsiveProp<To> | undefined {
	if (!fromValue) {
		return undefined
	}

	if (typeof fromValue !== 'object') {
		return mapper(fromValue)
	}

	return {
		mobile: fromValue.mobile ? mapper(fromValue.mobile) : undefined,
		tablet: fromValue.tablet ? mapper(fromValue.tablet) : undefined,
		desktop: fromValue.desktop ? mapper(fromValue.desktop) : undefined,
	}
}

export { getClassNames, ResponsiveProp, mapResponsiveProp }
