import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Content from "../screens/Content"
import User from "../screens/User"

const Tabs = createBottomTabNavigator()

const LoginNav = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Content" component={Content} />
      <Tabs.Screen name="User" component={User} />
    </Tabs.Navigator>
  )
}

export default LoginNav
