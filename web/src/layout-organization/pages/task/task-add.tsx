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

interface ITaskProps {
  onChange: (task: any) => void
}

export default function TaskAdd(props: ITaskProps) {
  const [task, setTask] = useState<any>({
    numberNeeded: '',
    startTime: '',
    endTime: ''
  })

  let emitChange = function(changes: any) {
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
          required={true}
          onChange={e => emitChange({ numberNeeded: e.target.value })}
          className={'full-width'}
          value={task.numberNeeded}
          type={'text'}
          label={'Number of Participants'}
        />
      </Block>

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
            value={task.startTime}
            type={'date'}
            onChange={e => emitChange({ startTime: e.target.value })}
          />
        </Block>
        <Block>
          <Input
            className={'full-width'}
            value={task.endTime}
            type={'date'}
            onChange={e => emitChange({ endTIme: e.target.value })}
          />
        </Block>
      </Yoga>
    </Content>
  )
}
