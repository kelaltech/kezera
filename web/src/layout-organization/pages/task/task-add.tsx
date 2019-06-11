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
    startDate: '',
    endDate: ''
  })

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
        <Yoga maxCol={2}>
          <span>
            <sup> Start date </sup><br/>
            <Input
              onChange={e=>emitChange({startDate:e.target.value})}
              className={'full-width'}
              name={'startDate'}
              type={'date'}
              required/>
          </span>
          <span>
            <sup> End date </sup><br/>
            <Input
              onChange={e=>emitChange({endDate:e.target.value})}
              className={'full-width'}
              name={"endDate"}
              type={'date'}
              required/>
          </span>
        </Yoga>
      </Block>
    </Content>
  )
}
