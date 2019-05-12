import React from 'react'
import { Text } from 'react-native'

import values from '../../../assets/styles/values'

function LabeledView({ label, value }: { label: string; value: string }) {
  return (
    <>
      <Text style={{ color: values.color.blackish, fontSize: values.fontSize.normal }}>
        {label}
      </Text>
      <Text
        style={{
          color: values.color.black,
          marginTop: values.space.small / 2,
          fontSize: values.fontSize.big,
          flexWrap: 'wrap'
        }}
      >
        {value}
      </Text>
    </>
  )
}

export default LabeledView
