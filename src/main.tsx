import '@/style/eric-reset.css'
import '@/style/common.css'
import 'virtual:uno.css'
import { createRoot } from 'react-dom/client'
import { App } from '@/app'

createRoot(document.getElementById('root')!).render(<App />)
