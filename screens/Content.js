import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { isLoggedInVar, logUserOut, tokenVar } from "../apollo"

const Content = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Content</Text>
      {/* <Button title="LogOut" onPress={logUserOut()} /> */}
    </View>
  )
}

export default Content
