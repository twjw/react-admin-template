import { MutableRefObject, useEffect, useState } from 'react'

type RefHeightProps = {
	targetRef: MutableRefObject<HTMLElement | null>
	className?: string
	onChange?: (height: number) => void
}

/**
 * @description 可以用在 fixed 的地方來推佔位高，用來同步 ref height
 */
function RefHeight({ className, targetRef, onChange }: RefHeightProps) {
	const [height, setHeight] = useState(0)

	useEffect(() => {
		const h = targetRef.current?.clientHeight
		if (h != null) {
			setHeight(h)

			if (height !== h) {
				onChange?.(h)
			}
		}
	})

	return <div className={className} style={{ height }} />
}

export { RefHeight }
