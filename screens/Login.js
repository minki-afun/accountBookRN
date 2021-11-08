import React, { useRef } from "react"
import { Text, View } from "react-native"
import styled from "styled-components/native"
import ButtonTemp from "../components/main/ButtonTemp"
import LogoLayout from "../components/main/LogoLayout"

const Login = ({ navigation }) => {
  // 해당 input 입력 후 다음 input으로 자동이동
  const passwordRef = useRef()
  const onNext = (nextOne) => {
    nextOne?.current?.focus()
  }

  return (
    <LogoLayout>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor="gray"
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastone={true}
        placeholderTextColor="gray"
        onSubmitEditing={() => console.log("제출")}
      />
      <ButtonTemp onPress={() => console.log("제출")} text="Login" />
    </LogoLayout>
  )
}

export default Login

const TextInput = styled.TextInput`
  width: 60%;
  padding: 15px 7px;
  margin-bottom: 8px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px;
  background-color: rgba(50, 120, 200, 0.3);
  color: white;
`
