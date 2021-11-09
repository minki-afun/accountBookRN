import { gql, useQuery } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { View, Text, Button, TouchableOpacity, Image } from "react-native"
import { isLoggedInVar, logUserOut, tokenDecodeId, tokenVar } from "../apollo"
import styled from "styled-components/native"

const USER_DATA = gql`
  query userData($id: Int!) {
    userData(id: $id) {
      id
      email
    }
  }
`

const User = () => {
  const { loading, error, data } = useQuery(USER_DATA, {
    variables: { id: tokenDecodeId() },
  })
  // if (error) console.log(error)
  if (loading) {
    return (
      <Container>
        <ImageStyle source={require("../assets/cat.gif")} />
      </Container>
    )
  }
  console.log(data)
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "black" }}>1</Text>
    </View>
  )
}

export default User

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const ImageStyle = styled.Image`
  width: 150px;
  height: 150px;
`
