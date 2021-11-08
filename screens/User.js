import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { View, Text, Button, TouchableOpacity } from "react-native"
import { isLoggedInVar, logUserOut, tokenVar } from "../apollo"

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
      <TouchableOpacity title="LogOut" onPress={logUserOut()} />
    </View>
  )
}

export default User
