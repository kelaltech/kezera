import React from 'react'
import { Block, Content, Page } from 'gerami'

import NewsCard from '../../../shared/components/news-card/news-card'

export default function News() {
  // todo
  return (
    <Page>
      <Content size={'XXL'}>
        <Block />
        <Block />
        <Block>
          <NewsCard />
        </Block>
      </Content>
    </Page>
  )
}
