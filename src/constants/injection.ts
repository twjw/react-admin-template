import { MessageInstance } from 'antd/es/message/interface'
import { NotificationInstance } from 'antd/es/notification/interface'
import { HookAPI } from 'antd/es/modal/useModal'
import { NavigateFunction } from 'react-router-dom'

export const hookInstances = {
	navigate: null as NavigateFunction | null,
	message: null as MessageInstance | null,
	modal: null as HookAPI | null,
	notification: null as NotificationInstance | null,
}
