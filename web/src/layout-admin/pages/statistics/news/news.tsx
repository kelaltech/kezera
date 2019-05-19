import React from 'react'
import './news.scss'
import { Block, Content, Flex, Title } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFetch } from '../../../hooks/Fetch'
import useLocale from '../../../../shared/hooks/use-locale/use-locale'

export default function News() {
  let { t } = useLocale(['admin'])
  let news = useFetch('/api/admin/news')
  let likes = useFetch('/api/admin/news/likes')
  let comments = useFetch('/api/admin/news/comments')
  return (
    <Content transparent className="Admin-News-Compenent">
      <span className={'Events-Title'}>
        {' '}
        <FontAwesomeIcon icon={'newspaper'} /> {t`news`}
      </span>
      <Block className={'center'}>
        <Title size={'3XL'}>{news}</Title>
        <Block className={'center'}>
          <FontAwesomeIcon icon={'newspaper'} size={'3x'} />
        </Block>
        <Block />
      </Block>
      <hr />
      <Block className={'AdminNewsLike flex'}>
        <Flex className={'inline-block full-width'}>
          <Title size={'XL'}>
            <FontAwesomeIcon icon={'thumbs-up'} /> &emsp; {likes}
          </Title>
        </Flex>
        <Flex className={'full-width'}>
          <Title size={'XL'} className={'inline-block'}>
            {' '}
            {t`likes`}
          </Title>
        </Flex>
      </Block>
      <hr />
      <Block className={'flex'}>
        <Flex className={'inline-block full-width'}>
          <Title size={'XL'}>
            <FontAwesomeIcon icon={'comment'} /> &emsp; {comments}
          </Title>
        </Flex>
        <Flex className={'inline-block full-width'}>
          <Title size={'XL'}> {t`comments`} </Title>
        </Flex>
      </Block>
    </Content>
  )
}
