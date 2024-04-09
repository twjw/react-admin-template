import { useState } from 'react'
import { fetch2 } from '@/service/fetch2'
import { t } from '~i18n'
import { Button, Form, Input } from 'antd'
import { envConfig } from '~env-config'
import { storage } from '@/service/store/storage.ts'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '@/service/fetch2/helper/user.ts'
import { hookInstances } from '@/constants'

type FieldType = {
	username: string
	password: string
}

function Page() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	async function onLogin(values: FieldType) {
		setLoading(true)
		const loginRes = await fetch2('mock:user:post:/api/user/login', {
			body: values,
			params: { expiredMinutes: 30 },
		})

		if (loginRes.success) {
			storage.token.setItem(loginRes.data!.token)

			const userProfile = await getUserProfile()

			if (userProfile != null) {
				hookInstances.message?.success(t('loginSucceedRedirect'))

				setTimeout(() => {
					setLoading(false)
					navigate('/home')
				}, 1500)
			} else {
				setLoading(false)
			}
		} else {
			setLoading(false)
		}
	}

	return (
		<div className={'w-full min-h-screen bg-geekblue1 flex-center relative'}>
			<div className="absolute left-0 top-0 w-1/2 h-full bg-geekblue1" />
			<div className="absolute right-0 top-0 w-1/2 h-full bg-geekblue10" />
			<div className="bg-white w-768 min-h-screen max-w-full flex relative shadow-xl">
				<Form
					className={'w-full flex-center flex-col'}
					layout="vertical"
					name="login"
					initialValues={
						envConfig.vite.isLocal
							? {
									username: envConfig.vite.username,
									password: envConfig.vite.password,
								}
							: undefined
					}
					onFinish={onLogin}
					autoComplete="off"
				>
					<div className="w-90%">
						<div className={'mb-18 font-bold text-24 w-full text-left'}>{envConfig.title}</div>

						<div className={'mb-18 font-bold text-20 w-full text-left'}>{t('login')}</div>

						<Form.Item<FieldType>
							label={t('username')}
							name="username"
							rules={[{ required: true, message: t('plzEnterUsername') }]}
						>
							<Input autoFocus />
						</Form.Item>

						<Form.Item<FieldType>
							label={t('password')}
							name="password"
							rules={[{ required: true, message: t('plzEnterPassword') }]}
						>
							<Input.Password />
						</Form.Item>

						<Button
							className={'w-full h-40'}
							type="primary"
							htmlType="submit"
							loading={loading}
						>
							{t('login')}
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default Page
