import React from 'react'
import { withNavigation } from 'react-navigation'
import { View, Text, ScrollView } from 'react-native'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import Header from '../../../shared/components/header/header'
function NewsSearchList () {

  return (
    <>
      <Header showBack title={'news search list'}/>
     <View>
      <OrganizationCard/>
     </View>
    </>
  )
}

export default withNavigation(NewsSearchList)