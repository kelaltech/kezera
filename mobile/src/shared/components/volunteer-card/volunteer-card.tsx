import React from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { View, Text, Image, ImageURISource } from 'react-native'
import { Card} from 'react-native-elements'

interface IVolnteerCardProps {
  img: ImageURISource,
  description: string,
  name: string
}
function VolunteerCard ({navigation,name,description,img}: NavigationInjectedProps&IVolnteerCardProps) {

  return (
    <View>
      <Card
        title={name}
        image={img}>
        <Text style={{marginBottom: 10}}>
          {description}
        </Text>
      </Card>
    </View>
  )
}

export default withNavigation(VolunteerCard)