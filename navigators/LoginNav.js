import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Content from "../screens/Content"
import User from "../screens/User"
import { logUserOut } from "../apollo"
import styled from "styled-components/native"
import { Text, View, Image } from "react-native"

const Tabs = createBottomTabNavigator()

const LoginNav = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
      }}
    >
      <Tabs.Screen name="Content" component={Content} />
      <Tabs.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ color }) => (
            <ImageDiv source={require("../assets/icon1.png")} />
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
  background-color: orange;
  padding: 15px 7px;
  width: 80px;
  border-radius: 10px;
  margin-right: 15px;
`
const ButtonText = styled.Text`
  font-weight: 800;
  text-align: center;
`
const ImageDiv = styled.Image`
  width: 40px;
  height: 40px;
`
