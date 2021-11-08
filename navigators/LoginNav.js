import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Content from "../screens/Content"

const Tabs = createBottomTabNavigator()

const LoginNav = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Content" component={Content} />
    </Tabs.Navigator>
  )
}

export default LoginNav
