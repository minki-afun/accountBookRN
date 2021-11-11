import React from "react"
import { TouchableOpacity, Image } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Content from "../screens/Content"
import CreateContent from "../components/CreateContent"
const Stack = createStackNavigator()

const ContentNav = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="CreateContent" component={CreateContent} />
    </Stack.Navigator>
  )
}

export default ContentNav
