import React, { useState } from 'react'
import { Content, Block, Title, Button } from 'gerami'
import { FormControl } from '@material-ui/core/es'
import { InputLabel } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Axios from 'axios'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

interface IMaterialAddProps {
  onChange: (material: any) => void
}
export default function MaterialAdd(props: IMaterialAddProps) {
  let [material, setMaterial] = useState({ status: '', materialType: '' })
  let { t } = useLocale(['material-donation'])
  let emitChange = function(changes: any): void {
    props.onChange({ ...material, ...changes })
    setMaterial({ ...material, ...changes })
  }
  return (
    <Content transparent>
      <Block>
        <FormControl className={'full-width'}>
          <InputLabel>{t`status`}</InputLabel>
          <Select
            value={material.status}
            onChange={e => emitChange({ status: e.target.value })}
            inputProps={{
              name: 'status'
            }}
          >
            <MenuItem value="NEW">
              {' '}
              <em>{t`new`}</em>{' '}
            </MenuItem>
            <MenuItem value={'SLIGHTLY_USED'}>{t`slightly used`}</MenuItem>
            <MenuItem value={'OLD'}>{t`old`}</MenuItem>
            <MenuItem value={'OTHER'}>{t`other`}</MenuItem>
          </Select>
        </FormControl>
      </Block>
      <Block>
        <FormControl className={'full-width'}>
          <InputLabel>{t`type`}</InputLabel>
          <Select
            value={material.materialType}
            onChange={e => emitChange({ materialType: e.target.value })}
            inputProps={{
              name: 'materialType'
            }}
          >
            <MenuItem value="CHAIR">
              {' '}
              <em> {t`chair`} </em>{' '}
            </MenuItem>
            <MenuItem value={'BED'}>{t`bed`}</MenuItem>
            <MenuItem value={'BOOKS'}>{t`books`}</MenuItem>
            <MenuItem value={'CLOTH'}>{t`clothes`}</MenuItem>
            <MenuItem value={'CARPET'}>{t`carpet`}</MenuItem>
            <MenuItem value={'TABLE'}>{t`table`}</MenuItem>
          </Select>
        </FormControl>
      </Block>
    </Content>
  )
}
