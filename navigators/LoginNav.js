import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Content from "../screens/Content"
import User from "../screens/User"
import { logUserOut } from "../apollo"
import styled from "styled-components/native"
import { Text, View, Image } from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack"
import CreateContent from "../components/CreateContent"
import ContentNav from "./ContentNav"

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()

const LoginNav = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerTitle: "",
        headerTransparent: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          // borderTopColor: "gray",
        },
      }}
    >
      <Tabs.Screen
        name="Content"
        component={ContentNav}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "notebook" : "notebook-outline"}
              size={focused ? 30 : 28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={focused ? 30 : 28}
            />
          ),
          headerRight: () => (
            <ButtonView onPress={() => logUserOut()}>
              <ButtonText>Logout</ButtonText>
            </ButtonView>
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

export default LoginNav

const ButtonView = styled.TouchableOpacity`
  background-color: rgba(50, 80, 170, 0.3);
  padding: 15px 7px;
  width: 80px;
  border-radius: 10px;
  margin-right: 15px;
`
const ButtonText = styled.Text`
  font-weight: 800;
  text-align: center;
  color: white;
`
const ImageDiv = styled.Image`
  width: 40px;
  height: 40px;
`
