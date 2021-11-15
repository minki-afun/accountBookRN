import { gql, useQuery } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native"
import { isLoggedInVar, logUserOut, tokenDecodeId, tokenVar } from "../apollo"
import styled from "styled-components/native"
import Balance from "../components/Balance"
import Wrapper from "../components/Wrapper"
import { Ionicons } from "@expo/vector-icons"

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
  // if (loading) {
  //   return (
  //     <Container>
  //       <ImageStyle source={require("../assets/cat.gif")} />
  //     </Container>
  //   )
  // }
  return (
    <Container>
      <ProfileContainer>
        <Ionicons name="person" size={50} />
        <ProfileText>{data?.userData.email}</ProfileText>
      </ProfileContainer>
      <Balance userId={tokenDecodeId()} />
      <Wrapper />
    </Container>
    // <ViewContainer>
    //   <BoxView>
    //     <BoxDiv>{data?.userData.email}</BoxDiv>
    //     <BoxDiv2>환영합니다</BoxDiv2>
    //   </BoxView>
    //   <Balance userId={tokenDecodeId()} />
    //   <Wrapper />
    // </ViewContainer>
  )
}

export default User

const Container = styled.View`
  flex: 1;
  /* align-items: center; */
  /* background-color: #444444; */
`
const ProfileContainer = styled.View`
  /* border: 1px solid gray; */
  /* border-radius: 30px; */
  margin-top: 100px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 20px 30px;
  flex-direction: row;
  align-items: center;
`

const ProfileText = styled.Text`
  margin-left: 20px;
  font-size: 25px;
`
