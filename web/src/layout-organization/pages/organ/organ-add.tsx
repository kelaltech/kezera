import React, { useState } from 'react'
import { Block, Content, Input, Title, Yoga } from 'gerami'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { number } from 'prop-types'

interface IOrganProps {
  onChange: (organ: any) => void
}

function OrganAdd(props: IOrganProps) {
  const [organ, setOrgan] = useState<any>({
    organType: '',
    quantity: 0
  })

  let emitChange = function(changes: any): void {
    props.onChange({ ...organ, ...changes })
    setOrgan({ ...organ, ...changes })
  }

  return (
    <Content size={'L'}>
      <Block>
        <Title size={'XL'}>Organ Specific</Title>
      </Block>
      <hr />
      <Block>
        <FormControl className={'full-width'}>
          <InputLabel htmlFor={'organ-type-label-placeholder'} shrink>
            Type of Organ
          </InputLabel>
          <Select
            required={true}
            onChange={e => emitChange({ organType: e.target.value })}
            value={organ.organType}
            input={
              <MatInput
                placeholder={'Select the Type of Organ'}
                name="type"
                id="organ-type-label-placeholder"
              />
            }
          >
            <MenuItem value={'KIDNEYS'}>Kidney</MenuItem>
            <MenuItem value={'HEART'}>Heart</MenuItem>
            <MenuItem value={'LUNGS'}>Lung</MenuItem>
            <MenuItem value={'PANCREAS'}>Pancreas</MenuItem>
            <MenuItem value={'LIVER'}>Liver</MenuItem>
            <MenuItem value={'SMALL_INTESTINE'}>Small Intestine</MenuItem>
            <MenuItem value={'BLOOD'}>Blood</MenuItem>
          </Select>
          <Block />
          <Input
            className={'full-width'}
            value={organ.quantity}
            onChange={e => emitChange({ quantity: e.target.value })}
            placeholder={'Amount needed'}
            type={'number'}
            name={'quantity'}
            required
          />
        </FormControl>
      </Block>
    </Content>
  )
}

export default OrganAdd
