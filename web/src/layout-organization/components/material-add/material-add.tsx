import React, { useState } from 'react'
import { Content, Block, Title, Button } from 'gerami'
import { FormControl } from '@material-ui/core/es'
import { InputLabel } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Axios from 'axios'

interface IMaterialAddProps {
  onChange: (material: any) => void
}
export default function MaterialAdd(props: IMaterialAddProps) {
  let [material, setMaterial] = useState({ status: '', materialType: '' })

  let emitChange = function(changes: any): void {
    props.onChange({ ...material, ...changes })
    setMaterial({ ...material, ...changes })
  }
  return (
    <Content transparent>
      <Block>
        <FormControl className={'full-width'}>
          <InputLabel>Status</InputLabel>
          <Select
            value={material.status}
            onChange={e => emitChange({ status: e.target.value })}
            inputProps={{
              name: 'status'
            }}
          >
            <MenuItem value="NEW">
              {' '}
              <em>New</em>{' '}
            </MenuItem>
            <MenuItem value={'SLIGHTLY_USED'}>Slightly used</MenuItem>
            <MenuItem value={'OLD'}>Old</MenuItem>
            <MenuItem value={'OTHER'}>Other</MenuItem>
          </Select>
        </FormControl>
      </Block>
      <Block>
        <FormControl className={'full-width'}>
          <InputLabel>Type</InputLabel>
          <Select
            value={material.materialType}
            onChange={e => emitChange({ materialType: e.target.value })}
            inputProps={{
              name: 'materialType'
            }}
          >
            <MenuItem value="CHAIR">
              {' '}
              <em> Chair </em>{' '}
            </MenuItem>
            <MenuItem value={'BED'}>Books</MenuItem>
            <MenuItem value={'BOOKS'}>Books</MenuItem>
            <MenuItem value={'CLOTH'}>Cloth</MenuItem>
            <MenuItem value={'CARPET'}>Carpet</MenuItem>
            <MenuItem value={'TABLE'}>Table</MenuItem>
          </Select>
        </FormControl>
      </Block>
    </Content>
  )
}
