import React, { Component } from 'react'
import {
  Anchor,
  Block,
  Button,
  Card,
  Flex,
  FlexSpacer,
  Image,
  Loading,
  Page,
  SlideShow,
  Yoga
} from 'gerami'
import axios from 'axios'

import './request-card.scss'

export interface ITaskProps {
  task: any
}

export default function TaskCard({ task }: ITaskProps) {
  return (
    <Card imgSrc={task.picture}>
      <div>{task.name}</div>
      <hr />
      <Yoga maxCol={2}>
        <h5>Start Date/Time</h5>
        <h5>End Date/Time</h5>
      </Yoga>
      <Yoga maxCol={2}>
        <label>{new Date(task.startDate).toDateString()}</label>
        <label>{new Date(task.endDate).toDateString()}</label>
      </Yoga>
      <Yoga maxCol={2}>
        <label>{new Date(task.startTime).toDateString()}</label>
        <label>{new Date(task.endTime).toDateString()}</label>
      </Yoga>
      <label>{task.numberNeeded}</label>
      <hr />
      <Flex>
        <Anchor className={'margin-top-normal'} to={'/api/detail/' + task._id}>
          Details
        </Anchor>
        <FlexSpacer />
        <Button type="submit" primary>
          Support
        </Button>
      </Flex>
    </Card>
  )
}
