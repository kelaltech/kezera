import React from 'react'
import { Page, Yoga, Title } from 'gerami'
import MaterialCard from '../../components/material-card/material-card'

export default function MaterialsPage() {
  return (
    <Page>
      <Title className="center" size="3XL">
        {' '}
        Materials{' '}
      </Title>
      <Yoga maxCol={4}>
        <MaterialCard />
        <MaterialCard />
        <MaterialCard />
        <MaterialCard />
        <MaterialCard />
        <MaterialCard />
        <MaterialCard />
        <MaterialCard />
        <MaterialCard />
        <MaterialCard />
      </Yoga>
    </Page>
  )
}
