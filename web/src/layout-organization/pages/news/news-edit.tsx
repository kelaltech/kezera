import React from 'react'
import { Block } from 'gerami'
import NewsAdd from '../../components/news-add/news-add'
export default function NewsEditPage() {
  return (
    <div>
      <Block>
        <NewsAdd edit={true} />
      </Block>
    </div>
  )
}
