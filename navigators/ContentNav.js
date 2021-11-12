import React from "react"
import { TouchableOpacity, Image } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Content from "../screens/Content"
import CreateContent from "../components/CreateContent"
import CreateContents from "../components/CreateContents"
const Stack = createStackNavigator()

const ContentNav = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="CreateContent" component={CreateContents} />
    </Stack.Navigator>
  )
}

export default ContentNav
