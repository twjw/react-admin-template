import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import '@/app.css'
import { envConfig } from '~env-config'
import { watom } from 'wtbx-react-atom'

const $color = watom(0 as 0 | 1)
const $count = watom(0 as number)

function CountNumber() {
	const count = $count.use

	return (
		<span>
			{count} count: {Math.random()}
		</span>
	)
}

function CountBtn() {
	return (
		<div>
			<div>CountBtn: {Math.random()}</div>
			<button onClick={() => $count(e => e + 1)}>
				count is <CountNumber />
			</button>
		</div>
	)
}

function ChangeColorBtn() {
	return (
		<div>
			<button onClick={() => $color(e => (e === 0 ? 1 : 0))}>更改顏色</button>
			<div>ChangeColorBtn: {Math.random()}</div>
		</div>
	)
}

function Title() {
	const color = $color.use

	return (
		<div>
			<h1 className={color === 0 ? 'c-black' : 'c-red'}>{envConfig.title}</h1>
			<div>ChangeColorBtn: {Math.random()}</div>
		</div>
	)
}

function ResetStore() {
	return (
		<div>
			<button
				onClick={() => {
					$count(0)
					$color(0)
				}}
			>
				重置狀態
			</button>
			<div>ResetStore: {Math.random()}</div>
		</div>
	)
}

function Page() {
	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<Title />
			<div>Page: {Math.random()}</div>
			<div className="card">
				<CountBtn />
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
				<ChangeColorBtn />
				<ResetStore />
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	)
}

export default Page
