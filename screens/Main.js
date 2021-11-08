import React from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native"
import styled from "styled-components/native"

import LogoLayout from "../components/main/LogoLayout"
import ButtonTemp from "../components/main/ButtonTemp"

const Main = ({ navigation }) => {
  const goLogin = () => navigation.navigate("Login")
  const goRegister = () => navigation.navigate("Register")
  return (
    <LogoLayout>
      <ButtonTemp onPress={goLogin} text="Login" />
      <ButtonTemp onPress={goRegister} text="Register" />
    </LogoLayout>
  )
}

export default Main
