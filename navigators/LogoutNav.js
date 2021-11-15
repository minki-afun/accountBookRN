import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Main from "../screens/Main"
import Login from "../screens/Login"
import Register from "../screens/Register"

const Stack = createStackNavigator()

const LogoutNav = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: "",
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTintColor: "lightsteelblue",
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTintColor: "lightsteelblue",
        }}
      />
    </Stack.Navigator>
  )
}

export default LogoutNav
