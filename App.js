import AppLoading from "expo-app-loading"
import React, { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { Image, StyleSheet, Text, View } from "react-native"
import styled from "styled-components/native"
import { ApolloProvider, useReactiveVar } from "@apollo/client"
import client, { isLoggedInVar, tokenDecodeId, tokenVar } from "./apollo"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Asset } from "expo-asset"
import LogoutNav from "./navigators/LogoutNav"
import LoginNav from "./navigators/LoginNav"
import { ModalPortal } from "react-native-modals"

export default function App() {
  // 로그인 인지 확인
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  // 데이터 가져오는 로딩 세팅
  const [loading, setLoading] = useState(true)
  // 데이터 가져오기 시작
  const start = async () => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      isLoggedInVar(true)
      tokenVar(token)
    }
    const imagesToLoad = [require("./assets/logo.png")]
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image))
    return Promise.all([...imagePromises])
  }
  // 데이터 가져오기 끝
  const onFinishLoading = () => setLoading(false)

  // 만약 로딩이면 로딩화면 띄우기
  if (loading) {
    return (
      <AppLoading
        startAsync={start}
        onError={console.warn}
        onFinish={onFinishLoading}
      >
        <ImageCat source={require("./assets/cat.gif")} />
        <LoadingText>
          <FontText>Loading...</FontText>
        </LoadingText>
      </AppLoading>
    )
  }
  // 로딩이 없으면 바로 메인페이지 렌더링
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoginNav /> : <LogoutNav />}
        <ModalPortal />
      </NavigationContainer>
    </ApolloProvider>
  )
}

const ImageCat = styled.Image`
  width: 100%;
  height: 100%;
`
const LoadingText = styled.View`
  position: absolute;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`

const FontText = styled.Text`
  font-size: 30px;
  font-weight: 700;
`
