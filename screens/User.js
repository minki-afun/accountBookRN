import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { View, Text, Button, TouchableOpacity } from "react-native"
import { isLoggedInVar, logUserOut, tokenVar } from "../apollo"
import styled from "styled-components/native"

const User = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>User</Text>
      <Buttons title="LogOut" onPress={() => logUserOut()} />
    </View>
  )
}

export default User

const Buttons = styled.TouchableOpacity`
  background-color: rosybrown;
  padding: 15px 10px;
  margin-top: 20px;
  width: 60%;
  padding: 15px 10px;
  border-radius: 7px;
`
