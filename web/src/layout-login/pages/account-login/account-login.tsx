import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from 'gerami'

export default function Login() {
  const { t } = useTranslation()

  // todo
  return <Page>{t`account:test`}</Page>
}
