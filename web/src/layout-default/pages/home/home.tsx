import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from 'gerami'

export default function Home() {
  const { t } = useTranslation()

  // todo
  return <Page>{t`Homepage`}</Page>
}
