import React from "react"
import { Keyboard, Platform } from "react-native"
import styled from "styled-components/native"

const LogoLayout = ({ children }) => {
  const keyDelete = () => {
    Keyboard.dismiss()
  }

  return (
    <BackgroundTouch onPress={keyDelete} disabled={Platform.OS === "web"}>
      <Container>
        <Logo resizeMode="contain" source={require("../../assets/logo.png")} />
        {children}
      </Container>
    </BackgroundTouch>
  )
}

export default LogoLayout

const BackgroundTouch = styled.TouchableWithoutFeedback`
  flex: 1;
`
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0px 20px;
`
const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  height: 150px;
`
