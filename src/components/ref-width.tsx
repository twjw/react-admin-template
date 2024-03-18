import { MutableRefObject, useEffect, useState } from 'react'

type RefWidthProps = {
	targetRef: MutableRefObject<HTMLElement | null>
	className?: string
	onChange?: (width: number) => void
}

/**
 * @description 可以用在 fixed 的地方來推佔位寬，用來同步 ref width
 */
function RefWidth({ className, targetRef, onChange }: RefWidthProps) {
	const [width, setWidth] = useState(0)

	useEffect(() => {
		const w = targetRef.current?.clientWidth
		if (w != null) {
			setWidth(w)

			if (width !== w) {
				onChange?.(w)
			}
		}
	})

	return <div className={className} style={{ width }} />
}

export { RefWidth }
