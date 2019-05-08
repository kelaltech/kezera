import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

import classes from '../../../assets/styles/classes'

type Props = {
  viewNode: React.ReactNode
  editNode: React.ReactNode

  onEditStart?: () => void
  onEditSubmit?: () => void
}

function EditableItem({ viewNode, editNode, onEditStart, onEditSubmit }: Props) {
  const [mode, setMode] = useState<'VIEW' | 'EDIT'>('VIEW')

  const viewMode = (): void => {
    onEditSubmit && onEditSubmit()
    setMode('VIEW')
  }

  const editMode = (): void => {
    onEditStart && onEditStart()
    setMode('EDIT')
  }

  return (
    <View style={{ ...classes.row, justifyContent: 'center' }}>
      <View style={{ ...classes.grow, justifyContent: 'center' }}>
        {mode === 'VIEW' && viewNode}
        {mode === 'EDIT' && editNode}
      </View>
      <TouchableOpacity
        onPress={() => (mode === 'VIEW' ? editMode() : viewMode())}
        style={classes.marginLeftSmall}
      >
        {mode === 'VIEW' ? (
          <Icon name={'edit'} raised />
        ) : mode === 'EDIT' ? (
          <Icon name={'check'} raised />
        ) : (
          undefined
        )}
      </TouchableOpacity>
    </View>
  )
}

export default EditableItem
