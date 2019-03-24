import React from 'react'
import './Table.scss'
import { Content, Title, Flex, Yoga, Block, CheckBox } from 'gerami'
// import CheckBox from '@material-ui/core/Checkbox'

export default function Table(props: any) {
  return <Content className={''}>{props.children}</Content>
}

export function TableHeader(props: any) {
  return <span className={'flex bg-primary padding-normal'}>{props.children}</span>
}

export function TableCell(props: any) {
  return (
    <Flex className={'full-width'}>
      <Block className={'margin-normal'} style={{ color: props.color }}>
        {props.children}{' '}
      </Block>
    </Flex>
  )
}
export function TableRow(props: any) {
  return <Flex className={'TableRow'}>{props.children}</Flex>
}
export function TableBody(props: any) {
  return (
    <Content className={'TableBody'}>
      <span>{props.children}</span>
    </Content>
  )
}
