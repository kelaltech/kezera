import React from 'react'
import { Block, Content } from 'gerami'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

function VolunteerSettings() {
  const { loading, t } = useLocale([
    /* todo: use some namespace */
  ])

  return (
    loading || (
      <Block last>
        <Content>volunteer-settings</Content>
      </Block>
    )
  )
}

export default VolunteerSettings
