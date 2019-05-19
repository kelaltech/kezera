import React from 'react'

import NewsView from '../../components/news-view/news-view'
import { useAccountState } from '../../../app/stores/account/account-provider'

export default function NewsDetailPage() {
  const { account } = useAccountState()
  return (
    <div>
      <NewsView role={account!.role} />
    </div>
  )
}
