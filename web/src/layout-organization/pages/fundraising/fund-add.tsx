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
    amount: '',
    currency: 'ETB',
    startTime: '',
    endTime: ''
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
      <Yoga maxCol={2}>
        <Block>
          <Input
            required={true}
            onChange={e => emitChange({ amount: e.target.value })}
            className={'full-width'}
            value={fund.amount}
            type={'text'}
            label={'Amount of Money'}
          />
        </Block>
        <FormControl className={'full-width'}>
          <InputLabel htmlFor={'fund-type-label-placeholder'} shrink>
            Type of Currency
          </InputLabel>
          <Select
            required={true}
            onChange={e => emitChange({ currency: e.target.value })}
            value={fund.currency}
            input={
              <MatInput
                placeholder={'Select the Type of Currency'}
                name="currency"
                id="fund-type-label-placeholder"
              />
            }
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'ETB'}>ETB</MenuItem>
            <MenuItem value={'EURO'}>EURO</MenuItem>
            <MenuItem value={'POUND'}>POUND</MenuItem>
          </Select>
        </FormControl>
      </Yoga>

      <Yoga maxCol={2}>
        <Block>
          <Title>Start Time</Title>
        </Block>
        <Block>
          <Title>End Time</Title>
        </Block>
      </Yoga>

      <Yoga maxCol={2}>
        <Block>
          <Input
            required={true}
            className={'full-width'}
            value={fund.startTime}
            type={'date'}
            onChange={e => emitChange({ startTime: e.target.value })}
          />
        </Block>
        <Block>
          <Input
            className={'full-width'}
            value={fund.endTime}
            type={'date'}
            onChange={e => emitChange({ endTime: e.target.value })}
          />
        </Block>
      </Yoga>
    </Content>
  )
}

export default FundAdd
