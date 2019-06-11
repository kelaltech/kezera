import React, { Component, useRef, useState } from 'react'
import {
  Block,
  Button,
  Content,
  ImageInput,
  Input,
  Page,
  TextArea,
  Title,
  Yoga
} from 'gerami'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

interface ITaskProps {
  onChange: (task: any) => void
}

export default function TaskAdd(props: ITaskProps) {
  const [task, setTask] = useState<any>({
    numberNeeded: '',
    startDate: '',
    endDate: '',
    type: ''
  })
  let { t, loading } = useLocale(['task'])
  let emitChange = function(changes: any): void {
    props.onChange({ ...task, ...changes })
    setTask({ ...task, ...changes })
  }

  return (
    <Content size={'L'}>
      <Block>
        <Title size={'XL'}>Task Specific</Title>
      </Block>
      <hr />
      <Block>
        <Input
          onChange={e => emitChange({ numberNeeded: e.target.value })}
          className={'full-width'}
          value={task.numberNeeded}
          type={'number'}
          required={true}
          label={'Number of Participants'}
        />
      </Block>
      <Block>
        <FormControl className={'full-width'}>
          <InputLabel>{t`type`}</InputLabel>
          <Select
            onChange={e => emitChange({ type: e.target.value })}
            inputProps={{
              name: 'Type'
            }}
            required={true}
          >
            <MenuItem value={'Advocacy & Human Rights'}>Advocacy & Human Rights</MenuItem>
            <MenuItem value={'Animal'}>Animal </MenuItem>
            <MenuItem value={'Art & Culture'}> Art & Culture </MenuItem>
            <MenuItem value={'Children & Youth'}>Children & Youth </MenuItem>
            <MenuItem value={'Community'}>Community </MenuItem>
            <MenuItem value={'Computer & Technology'}>Computer & Technology </MenuItem>
            <MenuItem value={'Crisis Support'}> Crisis Support</MenuItem>
            <MenuItem value={'Disaster Relief'}> Disaster Relief</MenuItem>
            <MenuItem value={'Education & Literacy'}>Education & Literacy </MenuItem>
            <MenuItem value={'Faith-Based'}>Faith-Based </MenuItem>
            <MenuItem value={'Emergency & Safety'}>Emergency & Safety </MenuItem>
            <MenuItem value={'Media & Broadcasting'}>Media & Broadcasting</MenuItem>
            <MenuItem value={'People with Disability'}>People with Disability</MenuItem>
            <MenuItem value={'Sport & Recreation'}>Sport & Recreation</MenuItem>
          </Select>
        </FormControl>
      </Block>
      <Block>
        <Yoga maxCol={2}>
          <span>
            <sup> Start date </sup>
            <br />
            <Input
              onChange={e => emitChange({ startDate: e.target.value })}
              className={'full-width'}
              name={'startDate'}
              type={'date'}
              required
            />
          </span>
          <span>
            <sup> End date </sup>
            <br />
            <Input
              onChange={e => emitChange({ endDate: e.target.value })}
              className={'full-width'}
              name={'endDate'}
              type={'date'}
              required
            />
          </span>
        </Yoga>
      </Block>
    </Content>
  )
}
