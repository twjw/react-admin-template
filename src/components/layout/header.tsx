import { envConfig } from '~env-config'
import { t } from '~i18n'
import { storage } from '@/service/store/storage.ts'
import { hookInstances } from '@/constants/injection.ts'
import { MenuOutlined } from '@ant-design/icons'
import { $sidebarCollapsed } from '@/components/layout/atoms.ts'

function Header() {
	function onLogout() {
		storage.token.setItem(null)
		hookInstances.message?.success(t('psucceed', [t('logout')]))
		hookInstances.navigate?.('/login')
	}

	return (
		<div className={'w-full flex items-center py-8 px-24 bg-white b-b-1 b-solid b-gray1'}>
			<MenuOutlined onClick={() => $sidebarCollapsed(e => !e)} />
			<div className={'c-gray9 font-bold text-18 ml-12'}>{envConfig.title}</div>
			<div className={'c-gray9 text-14 cursor-pointer ml-auto'} onClick={onLogout}>
				{t('logout')}
			</div>
		</div>
	)
}

export { Header }
