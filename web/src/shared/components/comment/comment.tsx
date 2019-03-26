import React, { useState } from 'react'
import { Content } from 'gerami'

export default function Comment() {
  let [comments, setCommets] = useState([])
  return (
    <>
      <Content className="">some comment data</Content>
    </>
  )
}
