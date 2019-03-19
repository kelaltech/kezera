import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from 'gerami'

export default function AccountSettings() {
  const { t } = useTranslation()

  // todo
  return <Page>{t`Login`} Reset</Page>
}
