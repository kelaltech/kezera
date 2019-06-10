import React from 'react'
import { withNavigation } from 'react-navigation'
import { View, Text, ScrollView } from 'react-native'
import VolunteerCard from '../../../../../shared/components/volunteer-card/volunteer-card'

function NewsSearchList () {

  return (
    <>
     <View>
      <VolunteerCard/>
     </View>
    </>
  )
}

export default withNavigation(NewsSearchList)