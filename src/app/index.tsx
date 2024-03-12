import { BrowserRouter } from 'react-router-dom'
import { App as I18nApp } from '~i18n'
import { Routes } from '@/app/routes.tsx'

function App () {
  return (
    <BrowserRouter>
      <I18nApp defaultLocale={'zh_TW'}>
        <Routes />
      </I18nApp>
    </BrowserRouter>
  )
}

export {
  App
}
