import React from 'react'
import './landing-card-2.scss'
import { Button } from '@material-ui/core'

interface ILandingCard {
  title: string
  actionTo: string
  actionName: string
  description: string
  className?: string
}
function LandingCard2(props: ILandingCard) {
  const { actionTo, description, title, actionName, className } = props
  return (
    <div className={`l2-card-container ${className ? className : ''}`}>
      <div className={'l2-title'}>{title}</div>
      <div className={'l2-content'}>
        <p>{description}</p>
      </div>
      <Button href={actionTo} className={'l2-action'}>
        {actionName}
      </Button>
    </div>
  )
}

export default LandingCard2
