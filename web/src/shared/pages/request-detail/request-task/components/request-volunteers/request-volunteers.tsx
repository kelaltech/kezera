import React, { useState, useEffect } from 'react'
import { Content, Yoga } from 'gerami'

interface IVolunteersGoing {
  request: any
}

function RequestVolunteers({ request }: IVolunteersGoing) {
  return (
    <Content>
      <Yoga maxCol={5}>
        <div>
          <h1>asdasd</h1>
        </div>
      </Yoga>
    </Content>
  )
}
export default RequestVolunteers
