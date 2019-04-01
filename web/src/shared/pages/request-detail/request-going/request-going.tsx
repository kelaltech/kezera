import React, { Component } from 'react'
import { Page, Image, Content, Block, Title, Yoga, Anchor } from 'gerami'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CheckBox from '@material-ui/core/Checkbox'

const data = [{ name: 'Dagmawi Worku' }, { name: 'Dagmawi Worku' }]

export default class Going extends Component<any> {
  render() {
    return (
      <Page>
        <Block>
          <Title size="3XL" className={'center'}>
            {' '}
            People Going{' '}
          </Title>
        </Block>
        <Content>
          <Table>
            {data.map(d => (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <label> {d.name} </label>
                  </TableCell>
                  <TableCell>
                    <Anchor className={'right'}> View Profile </Anchor>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </Content>
      </Page>
    )
  }
}
