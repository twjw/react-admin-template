import { watom } from 'wtbx-react-atom'
import { storage } from '@/service/store/storage.ts'

export const $sidebarCollapsed = watom<boolean>(false)
$sidebarCollapsed.watch((before, after) => storage.sidebarCollapsed.setItem(after))
