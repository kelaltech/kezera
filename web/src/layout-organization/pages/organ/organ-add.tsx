import React, { useState } from 'react'
import { Block, Content, Input, Title, Yoga } from 'gerami'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'

interface IOrganProps {
  onChange: (organ: any) => void
}

function OrganAdd(props: IOrganProps) {
  const [organ, setOrgan] = useState<any>({
    type: ''
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
      <FormControl className={'full-width'}>
        <InputLabel htmlFor={'organ-type-label-placeholder'} shrink>
          Type of Organ
        </InputLabel>
        <Select
          required={true}
          onChange={e => emitChange({ type: e.target.value })}
          value={organ.type}
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
      </FormControl>
    </Content>
  )
}

export default OrganAdd
