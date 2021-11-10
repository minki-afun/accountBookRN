import { gql, useQuery } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native"
import { isLoggedInVar, logUserOut, tokenDecodeId, tokenVar } from "../apollo"
import styled from "styled-components/native"
import Balance from "../components/Balance"

const USER_DATA = gql`
  query userData($id: Int!) {
    userData(id: $id) {
      id
      email
    }
  }
`

const User = () => {
  // apollo useQuery보기
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

  return (
    <ViewContainer>
      <BoxView>
        <BoxDiv>{data?.userData.email}</BoxDiv>
        <BoxDiv2>환영합니다</BoxDiv2>
      </BoxView>
      <Balance userId={tokenDecodeId()} />
    </ViewContainer>
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

const ViewContainer = styled.View`
  flex: 1;
  padding: 10px 10px;
  background-color: white;
`
const BoxView = styled.View`
  background-color: rgba(50, 80, 170, 0.3);
  width: 100%;
  height: 120px;
  border-radius: 20px;
  padding: 10px 10px;
  align-items: center;
  justify-content: center;
  margin-top: 25%;
`
const BoxDiv = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 35px;
  text-align: left;
`
const BoxDiv2 = styled.Text`
  color: white;
  font-size: 35px;
  text-align: left;
`
