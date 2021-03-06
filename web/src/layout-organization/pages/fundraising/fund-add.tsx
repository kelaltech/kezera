import React, { useState } from 'react'
import { Block, Content, Input, Title, Yoga } from 'gerami'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'

interface IFundProps {
  onChange: (fund: any) => void
}

function FundAdd(props: IFundProps) {
  const [fund, setFund] = useState<any>({
    target: ''
  })

  let emitChange = function(changes: any): void {
    props.onChange({ ...fund, ...changes })
    setFund({ ...fund, ...changes })
  }

  return (
    <Content size={'L'}>
      <Block>
        <Title size={'XL'}>Fundraising Specific</Title>
      </Block>
      <hr />
      <Block>
        <Input
          required={true}
          onChange={e => emitChange({ target: e.target.value })}
          className={'full-width'}
          value={fund.target}
          type={'text'}
          label={'Amount of Money'}
        />
      </Block>
    </Content>
  )
}

export default FundAdd
