import React from 'react'
import './landing-card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { Button } from '@material-ui/core'

interface ILandingCard {
  icon: any
  title: string
  actionTo: string
  actionName: string
}
function LandingCard(props: ILandingCard) {
  const { actionTo, icon, title, actionName } = props
  return (
    <div className={'landing-card-container'}>
      <div className={'l-icon'}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={'l-title'}>
        <h1>{title}</h1>
      </div>
      <Button href={actionTo} className={'l-action full-width'}>
        {actionName}
      </Button>
    </div>
  )
}

export default LandingCard
