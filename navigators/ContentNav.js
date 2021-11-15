import React from "react"
import { TouchableOpacity, Image } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Content from "../screens/Content"
import CreateContent from "../components/CreateContent"
import DetailContent from "../components/DetailContent"
import EditContent from "../components/EditContent"
import CreateContents from "../components/CreateContents"
const Stack = createStackNavigator()

const ContentNav = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="CreateContent" component={CreateContents} />
      <Stack.Screen name="DetailContent" component={DetailContent} />
      <Stack.Screen name="EditContent" component={EditContent} />
    </Stack.Navigator>
  )
}

export default ContentNav
